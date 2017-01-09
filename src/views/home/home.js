import React, { Component } from 'react';
import Query from '../../actions/query.js';
import './home.css';

class Home extends Component {
  getTimes(array) {
    return array.map((item) => {
      const classColour = item.category ? item.category : '';
      return <div key={item.id} className={classColour}>{ item.category }</div>
    });
  }
  render() {
    const timeBlocks = Query.getTimeBlocks();
    const days = Query.getDays();
    return (
      <div className="home">
        <header>
          <h2>Timesheet {new Date().getFullYear()}</h2>
        </header>
        <div>
          <ol>
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
                  return (
                    <li key={item.id} className="center-contents">
                        <div className="date">{ item.date }</div>
                        <div className="times">
                          { this.getTimes(item.times) }
                        </div>
                    </li>
                  );
               })
             }
          </ol>
        </div>
      </div>
    );
  }
}

export default Home;
