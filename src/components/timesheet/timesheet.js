import React, { Component } from 'react';
import TimesheetHeader from '../timesheet-header/timesheet-header';
import TimesheetBody from '../timesheet-body/timesheet-body';
import CategoryEdit from '../category-edit/category-edit';
import './timesheet.css';

class Timesheet extends Component {
  constructor() {
    super();
    this.state = {
      itemInEditMode: null,
    };

    this.handleDayEditMode = this.handleDayEditMode.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }
  handleCategorySelect(category) {
    this.props.handleUpdateDays(this.state.itemInEditMode.dateTime, this.state.itemInEditMode.timeId, category);
  }
  handleDayEditMode(dateTime, timeId) {
    this.setState({
      itemInEditMode: { timeId, dateTime }
    });
  }
  render() {
    return (
      <ol className="timesheet">
        {
          this.state.itemInEditMode && (
            <CategoryEdit handleCategorySelect={this.handleCategorySelect} />
          )
        }
        <TimesheetHeader />
        <TimesheetBody rows={this.props.days}
                       handleDayEditMode={this.handleDayEditMode} />
      </ol>
    );
  }
}

export default Timesheet;
