import React, { Component } from 'react';
import Query from '../../actions/query/query.js';

class TimesheetHeader extends Component {
  constructor() {
    super();

    this.timesheetHeader = Query.getTimeSheetHeader();
  }
  renderTimesheetHeader(array) {
    return array.map((item, index) => {
      const header = item.time.toString().length < 3 ? item.time : '';
      return (<div key={index} className="time-title">{ header }</div>);
    });
  }
  render() {
    return (
      <li className="timesheet-headers">
        <div className="date">Date</div>
        <div className="times">
          { this.renderTimesheetHeader(this.timesheetHeader) }
        </div>
      </li>
    );
  }
}

export default TimesheetHeader;
