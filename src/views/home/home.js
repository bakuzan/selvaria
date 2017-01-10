import React, { Component } from 'react';
import DayRow from '../../components/day-row/day-row';
import Query from '../../actions/query.js';
import './home.css';

class Home extends Component {
  render() {
    const timeBlocks = Query.getTimeBlocks();
    const days = Query.getDays();
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
                      <div key={item.id}>
                        { item.time }
                      </div>
                    );
                  })
                }
              </div>
            </li>
             {
               days.map((item) => {
                  return (<DayRow key={item.id} item={item} />);
               })
             }
          </ol>
        </div>
      </div>
    );
  }
}

export default Home;
