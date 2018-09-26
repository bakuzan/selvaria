import React, { Component } from 'react';
import DayRow from '../day-row/day-row';

class TimesheetBody extends Component {
  renderRows() {
    return this.props.rows.map((item) => {
      return <DayRow key={item.id} item={item} {...this.props.actions} />;
    });
  }
  render() {
    return <ol className="timesheet-body">{this.renderRows()}</ol>;
  }
}

export default TimesheetBody;
