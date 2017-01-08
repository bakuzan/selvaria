import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  getTimes(array) {
    return array.map((item) => {
      return <div key={item.time}>{ item.category }</div>
    });
  }
  render() {
    const timeBlocks = [
      { time: '0000', category: null },
      { time: '0030', category: null },
      { time: '0100', category: null },
      { time: '0130', category: null },
      { time: '0200', category: null },
      { time: '0230', category: null },
      { time: '0300', category: null },
      { time: '0330', category: null },
      { time: '0400', category: null },
      { time: '0430', category: null },
      { time: '0500', category: null },
      { time: '0530', category: null },
      { time: '0600', category: null },
      { time: '0630', category: null },
      { time: '0700', category: null },
      { time: '0730', category: null },
      { time: '0800', category: null },
      { time: '0830', category: null },
      { time: '0900', category: null },
      { time: '0930', category: null },
      { time: '1000', category: null },
      { time: '1030', category: null },
      { time: '1100', category: null },
      { time: '1130', category: null },
      { time: '1200', category: null },
      { time: '1230', category: null },
      { time: '1300', category: null },
      { time: '1330', category: null },
      { time: '1400', category: null },
      { time: '1430', category: null },
      { time: '1500', category: null },
      { time: '1530', category: null },
      { time: '1600', category: null },
      { time: '1630', category: null },
      { time: '1700', category: null },
      { time: '1730', category: null },
      { time: '1800', category: null },
      { time: '1830', category: null },
      { time: '1900', category: null },
      { time: '1930', category: null },
      { time: '2000', category: null },
      { time: '2030', category: null },
      { time: '2100', category: null },
      { time: '2130', category: null },
      { time: '2200', category: null },
      { time: '2230', category: null },
      { time: '2300', category: null },
      { time: '2330', category: null }
    ];
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
