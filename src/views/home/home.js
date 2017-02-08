import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
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
  }
  componentDidMount() {
    this.query(this.state.query);
  }
  query(queryValues) {
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
    const newType = (id === 'month' && value) || (id !== 'month' && query.month) ? 'month' : 'year';
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
            <h2>Timesheet {new Date().getFullYear()}</h2>
            <div className="header-actions">
              <form>
                <select id="year" value={this.state.query.year} onChange={(e) => this.updateSelectBox(e)}>
                  <option value="2017">2017</option>
                </select>
                <select id="month" value={this.state.query.month} onChange={(e) => this.updateSelectBox(e)}>
                  <option value="">ALL</option>
                  <option value="0">JAN</option>
                  <option value="1">FEB</option>
                </select>
                <button className="button primary ripple" type="button" onClick={ () => this.handleNextDayRequest() }>
                  Add next day
                </button>
              </form>
            </div>
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
