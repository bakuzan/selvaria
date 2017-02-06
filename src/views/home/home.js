import React, { Component } from 'react';
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
    };

    this.handleUpdateDays = this.handleUpdateDays.bind(this);
  }
  componentDidMount() {
    DayQuery.getByYear(2017).then(response => {
      console.log('day query res: ', response);
      if (response) {
        this.setState({ days: response.reverse() });
      }
    });
  }
  handleNextDayRequest() {
    const latestDay = this.state.days.slice()[0] || {};
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
    const day = days.find(x => CommonService.areDatesEqual(x.date, dateTime));
    let time = day.times.find(x => x.id === timeId);
    time.category = category;

    TimeQuery.save(time).then(response => {
      console.log('saved time: ', response);
      time = response;
      this.setState({ days: days });
    });
  }
  render() {
    console.log('days: ', this.state.days);

    return (
      <div id="home">
        <header>
          <h2>Timesheet {new Date().getFullYear()}</h2>
          <div className="header-actions">
            <button onClick={ () => this.handleNextDayRequest() }>
              Add next day
            </button>
          </div>
        </header>
        <div>
          <Timesheet days={this.state.days}
                     handleUpdateDays={this.handleUpdateDays} />
        </div>
      </div>
    );
  }
}

export default Home;
