import React, { Component } from 'react';
import Loadable from 'react-loadable';
import TimesheetHeader from '../timesheet-header/timesheet-header';
import TimesheetBody from '../timesheet-body/timesheet-body';
import './timesheet.css';

const Loading = props => props.pastDelay && <div>Waiting on server</div>;
const CategoryEdit = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'category-edit' */ '../category-edit/category-edit'),
  loading: Loading,
  delay: 1000
});

class Timesheet extends Component {
  constructor() {
    super();
    this.state = {
      itemInEditMode: null
    };

    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleDayEditMode = this.handleDayEditMode.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }
  handleEditClose() {
    console.log('CLOSE');
    this.setState({ itemInEditMode: null });
  }
  handleCategorySelect(category) {
    this.props.handleUpdateDays(
      this.state.itemInEditMode.dateTime,
      this.state.itemInEditMode.timeId,
      category
    );
    this.handleEditClose();
  }
  handleDayEditMode(editItem) {
    console.log('category edit render', editItem);
    this.setState({ itemInEditMode: editItem });
  }
  render() {
    console.log('timesheet render');
    return (
      <ol className="timesheet">
        {!!this.state.itemInEditMode && (
          <CategoryEdit
            editItem={this.state.itemInEditMode}
            handleCategorySelect={this.handleCategorySelect}
            handleCancelEdit={this.handleEditClose}
          />
        )}
        <TimesheetHeader />
        <TimesheetBody
          rows={this.props.days}
          handleMirrorDay={this.props.handleMirrorDay}
          handleDayEditMode={this.handleDayEditMode}
        />
      </ol>
    );
  }
}

export default Timesheet;
