import React, { Component } from 'react';
import DayRow from '../../components/day-row/day-row';
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
    console.log('times by day: ', TimeQuery.getByDay(new Date(2017, 0, 1)));

    this.handleDaysEditMode = this.handleDaysEditMode.bind(this);
    this.handleUpdateDays = this.handleUpdateDays.bind(this);
  }
  componentDidMount() {
    DayQuery.getByYear(2017).then(response => {
      console.log('day query res: ', response);
      if (response) this.setState({ days: response });

      this.handleNextDayRequest();
    });
  }
  handleNextDayRequest() {
    const latestDay = this.state.days.slice(-1)[0] || {};
    console.log('handleNextDayRequest: ', latestDay);
    Query.getNextDay(latestDay.date).then(newDay => {
      this.setState(prevState => {
        return { days: prevState.days.concat(newDay) };
      });
    });
  }
  handleDaysEditMode(dateTime, timeId) {
    const days = this.state.days.slice();
    const day = days.find(x => CommonService.areDatesEqual(x.date, dateTime));
    const time = day.times.find(x => x.id === timeId);
    time.isEditMode = true;
    this.setState({ days: days });
  }
  handleUpdateDays(dateTime, timeId, category) {
    const days = this.state.days.slice();
    const day = days.find(x => CommonService.areDatesEqual(x.date, dateTime));
    let time = day.times.find(x => x.id === timeId);
    time.isEditMode = false;
    time.category = category;

    TimeQuery.save(time).then(response => {
      console.log('saved time: ', response);
      time = response;
      this.setState({ days: days });
    });
  }
  render() {
    const timesheetHeader = Query.getTimeSheetHeader();
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
          <ol className="timesheet">
            <li className="list-headers">
              <div className="date">Date</div>
              <div className="times">
                {
                  timesheetHeader.map((item, index) => {
                    const header = item.time.toString().length < 3 ? item.time : '';

                    return (
                      <div key={index} className="time-title">
                        { header }
                      </div>
                    );
                  })
                }
              </div>
            </li>
             {
               this.state.days.map((item) => {
                  return (<DayRow key={item.dateString} item={item}
                                  handleEditMode={this.handleDaysEditMode}
                                  handleAssignTimeBlockCategory={this.handleUpdateDays} />);
               })
             }
          </ol>
        </div>
      </div>
    );
  }
}

export default Home;
