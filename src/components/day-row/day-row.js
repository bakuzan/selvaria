import React, { Component } from 'react';
import TimeBlock from '../../components/time-block/time-block';

class DayRow extends Component {
  getTimes(array) {
    return array.map((item) => {
      return <TimeBlock key={item.id} item={item} />
    });
  }
  render() {
    return (
      <li className="day-row center-contents">
          <div className="date">{ this.props.item.date }</div>
          <div className="times">
            { this.getTimes(this.props.item.times) }
          </div>
      </li>
    );
  }
}

export default DayRow;