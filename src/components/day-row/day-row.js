import React, { Component } from 'react';
import TimeBlock from '../../components/time-block/time-block';
import BreakdownService from '../../actions/statistics/breakdown-service';
import './day-row.css';

class DayRow extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      detail: []
    };

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
      return <TimeBlock key={item.id}
                        item={item}
                        handleEditMode={this.props.handleEditMode} />
    });
  }
  render() {
    const classes = `day-row${this.state.isExpanded ? ' is-expanded ' : ' ' }center-contents`;
    return (
      <li className={classes}>
          <div className="date">
            <button type="button" className="button ripple" onClick={() => this.toggleRowDetail()}>
              { this.props.item.dateString }
            </button>
          </div>
          <div className="times">
            { this.getTimes(this.props.item.times) }
          </div>
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
