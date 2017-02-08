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

    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleDayEditMode = this.handleDayEditMode.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }
  handleEditClose() {
    this.setState({ itemInEditMode: null });
  }
  handleCategorySelect(category) {
    this.props.handleUpdateDays(this.state.itemInEditMode.dateTime, this.state.itemInEditMode.timeId, category);
    this.handleEditClose();
  }
  handleDayEditMode(dateTime, timeId) {
    const itemForEdit = { timeId, dateTime };
    console.log('debug slow category edit render', itemForEdit);
    this.setState({ itemInEditMode: itemForEdit });
  }
  render() {
    console.log('timesheet render');
    return (
      <ol className="timesheet">
        {
          !!this.state.itemInEditMode &&
          (<CategoryEdit handleCategorySelect={this.handleCategorySelect}
                         handleCancelEdit={this.handleEditClose} />)
        }
        <TimesheetHeader />
        <TimesheetBody rows={this.props.days}
                       handleDayEditMode={this.handleDayEditMode} />
      </ol>
    );
  }
}

export default Timesheet;
