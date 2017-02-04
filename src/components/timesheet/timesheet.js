import React, { Component } from 'react';
import TimesheetHeader from '../timesheet-header/timesheet-header';
import DayRow from '../day-row/day-row';
import './timesheet.css';

class Timesheet extends Component {
  renderRows() {
    return this.props.days.map((item) => {
       return (<DayRow key={item.dateString} item={item}
                       handleEditMode={this.props.handleDaysEdit}
                       handleAssignTimeBlockCategory={this.props.handleUpdateDays} />);
    });
  }
  render() {
    const dayRows = this.renderRows();

    return (
      <ol className="timesheet">
        <TimesheetHeader />
         { dayRows }
      </ol>
    );
  }
}

export default Timesheet;
