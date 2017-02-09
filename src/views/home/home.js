import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ActionBar from '../../components/action-bar/action-bar';
import Timesheet from '../../components/timesheet/timesheet';
import Query from '../../actions/query.js';
import DayQuery from '../../actions/day-query.js';
import TimeQuery from '../../actions/time-query.js';
import CommonService from '../../actions/common-functions.js';
import Constants from '../../constants/values';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      loading: true,
      query: {
        type: Constants.queryTypes.year,
        year: 2017,
        month: '',
        period: null
      }
    };

    this.handleUpdateDays = this.handleUpdateDays.bind(this);
    this.query = this.query.bind(this);
    this.handleNextDayRequest = this.handleNextDayRequest.bind(this);
    this.updateSelectBox = this.updateSelectBox.bind(this);
  }
  componentDidMount() {
    this.query();
  }
  query() {
    if (!this.state.loading) this.setState({ loading: true });
    const queryValues = this.state.query;
    DayQuery[this.state.query.type](queryValues).then(response => this.updateTimesheetState(response));
  }
  updateTimesheetState(days) {
    console.log('day query res: ', days);
    if (days && days.length) {
      this.setState({ days: days.reverse(), loading: false });
    }
  }
  updateSelectBox(event) {
    const { id, value } = event.target;
    const query = this.state.query;
    const MONTH = Constants.strings.month;
    const newType = (id === MONTH && value) || (id !== MONTH && query.month) ? MONTH : Constants.strings.year;
    const updatedQuery = update(query, {
      [id]: { $set: value },
      type: { $set: Constants.queryTypes[newType] }
    });
    this.setState({ query: updatedQuery })
  }
  handleNextDayRequest() {
    const latestDay = this.state.days.slice(0)[0] || {};
    console.log('handleNextDayRequest: ', latestDay);
    if (!latestDay.date) return alert('No date selected!');

    Query.getNextDay(latestDay.date).then(newDayArray => {
      this.setState(prevState => {
        return { days: newDayArray.concat(prevState.days) };
      });
    });
  }
  handleUpdateDays(dateTime, timeId, category) {
    const days = this.state.days.slice();
    const dayIndex = days.findIndex(x => CommonService.areDatesEqual(x.date, dateTime));
    const day = days[dayIndex];
    const timeIndex = day.times.findIndex(x => x.id === timeId);
    const time = day.times[timeIndex];
    const updatedTime = update(time, { category: { $set: category } });

    TimeQuery.save(updatedTime).then(response => {
      console.log('saved time: ', response);
      const updatedDays = update(days, { [dayIndex]: { times: { [timeIndex]: { $set: response } } } })
      this.setState({ days: updatedDays });
    });
  }
  render() {
    console.log('home render: ', this.state);

    return (
      <div id="home">
      {
        this.state.loading &&
        <LoadingSpinner size="fullscreen" />
      }
      {
        !this.state.loading &&
        <div>
          <header>
            <h2>Timesheet</h2>
            <ActionBar {...this.state.query} query={this.query}
                                             updateSelectBox={this.updateSelectBox}
                                             handleNextDayRequest={this.handleNextDayRequest} />
          </header>
          <div>
            <Timesheet days={this.state.days}
                       handleUpdateDays={this.handleUpdateDays} />
          </div>
        </div>
      }
      </div>
    );
  }
}

export default Home;
