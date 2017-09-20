import React, { Component } from 'react';
import TimeBlock from '../../components/time-block/time-block';
import ActionMenu from '../../components/action-menu/action-menu';
import CommonService from '../../actions/common-service';
import DataService from '../../actions/data-service';
import BreakdownService from '../../actions/statistics/breakdown-service';
import './day-row.css';

class DayRow extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      detail: []
    };

    this.actions = [
      { text: 'Mirror yesterday', action: () => this.handleMirrorOption(1) },
      { text: 'Mirror last week', action: () => this.handleMirrorOption(7) }
    ];
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    const currentTimes = this.props.item.times;
    const nextTimes = nextProps.item.times;
    for(let i = 0, length = nextTimes.length; i < length; i++) {
      if (nextTimes[i].category !== currentTimes[i].category) return true;
    }
    return false;
  }
  
  handleMirrorOption(mirrorDaysAgo) {
    const { id, date } = this.props.item;
    const dateToMirror = new Date(date);
    dateToMirror.setDate(dateToMirror.getDate() - mirrorDaysAgo);
    this.props.handleMirror(id, dateToMirror);
  }
  toggleRowDetail() {
    this.setState(prevState => {
      let detail = prevState.detail;
      if (!prevState.isExpanded) {
        detail = BreakdownService.generateDayRowDetail(this.props.item.times);
      }
      return { isExpanded: !prevState.isExpanded, detail: detail };
    });
  }
  getTimes(array) {
    return array.map((item) => {
      return (
        <TimeBlock key={item.id}
                   item={item}
                   handleEditMode={this.props.handleEditMode} />
      );
    });
  }
  render() {
    const dayRow = this.props.item;
    const times = DataService.handleDayLength(dayRow.times);
    const isExpandedClass = this.state.isExpanded ? ' is-expanded' : '';
    const isWeekendClass = CommonService.isWeekend(dayRow.dayOfTheWeek);
    const classes = `day-row${isExpandedClass} start-center-contents`;

    return (
      <li className={classes}>
          <div className="date">
            <button type="button" className={`button ${isWeekendClass ? 'secondary ' : ''}ripple`} onClick={() => this.toggleRowDetail()}>
              { dayRow.dateString }
            </button>
          </div>
          <div className="times">
            { this.getTimes(times) }
          </div>
          {
            !!this.props.handleMirror &&
            <ActionMenu className="margin-left-auto"
                        actions={this.actions} />
          }
          {
            this.state.isExpanded &&
            <div className="day-row-detail">
              <ul className="category-list">
                { this.state.detail }
              </ul>
            </div>
          }
      </li>
    );
  }
}

export default DayRow;
