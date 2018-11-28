import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadableContent from '../../components/loadable-content';
import ActionBar from '../../components/action-bar/action-bar';
import Timesheet from '../../components/timesheet/timesheet';
import Query from '../../actions/query/query.js';
import DayQuery from '../../actions/query/day-query.js';
import TimeQuery from '../../actions/query/time-query.js';
import CommonService from '../../actions/common-service.js';
import DataService from '../../actions/data-service.js';
import './home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      days: [],
      loading: true,
      query: {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate()
      }
    };

    this.handleUpdateDays = this.handleUpdateDays.bind(this);
    this.query = this.query.bind(this);
    this.handleNextDayRequest = this.handleNextDayRequest.bind(this);
    this.updateSelectBox = this.updateSelectBox.bind(this);
    this.handleMirrorDay = this.handleMirrorDay.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.query();
  }
  query() {
    if (!this.state.loading) this.setState({ loading: true });
    const queryValues = this.state.query;
    const queryType = DataService.getQueryTypeFromValues(queryValues);

    DayQuery[queryType](queryValues).then((response) =>
      this.updateTimesheetState(response)
    );
  }
  updateTimesheetState(days) {
    if (!days) return;
    const newDays = days instanceof Array ? days.reverse() : [];
    this.setState({ days: newDays, loading: false });
  }
  updateSelectBox(name, value) {
    const query = this.state.query;
    const updatedQuery = DataService.updateQueryValues(query, name, value);

    this.setState({ query: updatedQuery });
  }
  handleNextDayRequest() {
    const latestDay = this.state.days.slice(0)[0] || {};
    const date =
      latestDay.date || DataService.getQueryStartDate(this.state.query);

    if (!DataService.canGetNextDay(date, this.state.query))
      return alert('End of date period reached.');

    this.setState({ loading: true });
    Query.getNextDay(date).then((newDayArray) => {
      this.setState((prevState) => {
        return {
          days: newDayArray.concat(prevState.days),
          loading: false
        };
      });
    });
  }
  handleMirrorDay(dayId, dateToMirror) {
    const days = this.state.days.slice(0);
    const dayIndex = days.findIndex((x) => x.id === dayId);
    const day = days[dayIndex];
    if (!day) return;
    if (!this.state.loading) this.setState({ loading: true });

    const dayToMirror = days.find((x) =>
      CommonService.areDatesEqual(x.date, dateToMirror)
    );

    DataService.mirrorDayCategories(day, dayToMirror).then((reflectedDay) => {
      const updatedDays = update(days, { [dayIndex]: { $set: reflectedDay } });
      this.setState({ days: updatedDays, loading: false });
    });
  }
  handleUpdateDays(dateTime, timeId, category) {
    const days = this.state.days.slice(0);
    const dayIndex = days.findIndex((x) =>
      CommonService.areDatesEqual(x.date, dateTime)
    );
    const day = days[dayIndex];
    const timeIndex = day.times.findIndex((x) => x.id === timeId);
    const time = day.times[timeIndex];
    const updatedTime = update(time, { category: { $set: category } });

    this.setState({ loading: true }, () =>
      TimeQuery.save(updatedTime).then((response) =>
        this.setState({
          days: update(days, {
            [dayIndex]: { times: { [timeIndex]: { $set: response } } }
          }),
          loading: false
        })
      )
    );
  }
  handleDelete(dayId) {
    this.setState({ loading: true }, () =>
      DayQuery.delete(dayId).then(() =>
        this.setState((prev) => ({
          days: prev.days.filter((x) => x.id !== dayId),
          loading: false
        }))
      )
    );
  }
  render() {
    const queryString = CommonService.constructQueryText(this.state.query);

    return (
      <div id="home">
        <LoadableContent
          isFetching={this.state.loading}
          spinnerSize="fullscreen"
        >
          <div>
            <div className="flex-row">
              <header className="flex-column">
                <h2 className="margin-0">Timesheet</h2>
                <p className="subtitle keep-line-breaks">
                  {`Query data for
                ${queryString}`}
                </p>
              </header>
              <div className="width-75 margin-left-auto">
                <ActionBar
                  {...this.state.query}
                  query={this.query}
                  updateSelectBox={this.updateSelectBox}
                  handleNextDayRequest={this.handleNextDayRequest}
                />
              </div>
            </div>
            <div>
              <Timesheet
                days={this.state.days}
                handleMirrorDay={this.handleMirrorDay}
                handleUpdateDays={this.handleUpdateDays}
                handleDeleteDay={this.handleDelete}
              />
            </div>
          </div>
        </LoadableContent>
      </div>
    );
  }
}

export default Home;
