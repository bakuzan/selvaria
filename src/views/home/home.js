import React, { Component } from 'react';
import DayRow from '../../components/day-row/day-row';
import Query from '../../actions/query.js';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: Query.getDays()
    };

    this.handleDaysEditMode = this.handleDaysEditMode.bind(this);
    this.handleUpdateDays = this.handleUpdateDays.bind(this);
  }
  handleDaysEditMode(dayId, timeId) {
    const days = this.state.days.slice();
    const day = days.find(x => x.id === dayId);
    const time = day.times.find(x => x.id === timeId);
    time.isEditMode = true;
    this.setState({ days: days });
  }
  handleUpdateDays(dayId, timeId, category) {
    const days = this.state.days.slice();
    const day = days.find(x => x.id === dayId);
    const time = day.times.find(x => x.id === timeId);
    time.isEditMode = false;
    time.category = category;
    this.setState({ days: days });
  }
  render() {
    const timeBlocks = Query.getTimeBlocks();
    console.log('days: ', this.state.days);
    return (
      <div className="home">
        <header>
          <h2>Timesheet {new Date().getFullYear()}</h2>
        </header>
        <div>
          <ol className="timesheet">
            <li className="list-headers">
              <div className="date">Date</div>
              <div className="times">
                {
                  timeBlocks.map((item) => {
                    return (
                      <div key={item.id} className="time-title">
                        { item.time }
                      </div>
                    );
                  })
                }
              </div>
            </li>
             {
               this.state.days.map((item) => {
                  return (<DayRow key={item.id} item={item}
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
