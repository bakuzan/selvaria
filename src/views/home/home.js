import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Timesheet from '../../components/timesheet/timesheet';
import Query from '../../actions/query.js';
import DayQuery from '../../actions/day-query.js';
import TimeQuery from '../../actions/time-query.js';
import CommonService from '../../actions/common-functions.js';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      loading: true,
    };

    this.handleUpdateDays = this.handleUpdateDays.bind(this);
  }
  componentDidMount() {
    DayQuery.getByYear(2017).then(response => {
      console.log('day query res: ', response);
      if (response) {
        this.setState({ days: response.reverse(), loading: false });
      }
    });
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
    console.log('days: ', this.state.days);

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
              <button className="button primary ripple" onClick={ () => this.handleNextDayRequest() }>
                Add next day
              </button>
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
