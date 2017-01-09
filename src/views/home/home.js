import React, { Component } from 'react';
import Query from '../../actions/query.js';
import './home.css';

class Home extends Component {
  getTimes(array) {
    return array.map((item) => {
      return <div key={item.time}>{ item.category }</div>
    });
  }
  render() {
    const timeBlocks = Query.getTimeBlocks();
    const days = [
      { date: '01/01/2017', timeBlocks: timeBlocks },
      { date: '02/01/2017', timeBlocks: timeBlocks }
    ];
    return (
      <div className="home">
        <p>Selvaria home page</p>
        <div>
          <ol>
          <li>
            <div className="date">date</div>
            <div className="times">
              {
                timeBlocks.map((item) => {
                  return (
                    <div key={item.time}>
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
                  <li key={item.date}>
                      <div className="date">{ item.date.toString() }</div>
                      <div className="times">
                        { this.getTimes(item.timeBlocks) }
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
