import React, { Component } from 'react';
import Query from '../../actions/query.js';

class TimesheetHeader extends Component {
  renderTimesheetHeader(array) {
    return array.map((item, index) => {
      const header = item.time.toString().length < 3 ? item.time : '';
      return (<div key={index} className="time-title">{ header }</div>);
    });
  }
  render() {
    const timesheetHeader = Query.getTimeSheetHeader();

    return (
      <li className="timesheet-headers">
        <div className="date">Date</div>
        <div className="times">
          { this.renderTimesheetHeader(timesheetHeader) }
        </div>
      </li>
    );
  }
}

export default TimesheetHeader;
