import React, { Component } from 'react';
import TimeBlock from '../../components/time-block/time-block';
import './day-row.css';

class DayRow extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      detail: []
    };

  }
  generateDetail(times, detail) {
    
  }
  toggleRowDetail() {
    this.setState(prevState => {
      let detail = prevState.detail;
      if (!prevState.isExpanded && detail.length === 0) {
        detail = this.generateDetail(this.props.item.times, detail);
      }
      return { isExpanded: !prevState.isExpanded, detail: detail };
    });
  }
  getTimes(array) {
    return array.map((item) => {
      return <TimeBlock key={item.id} item={item}
                        handleEditMode={this.props.handleEditMode} />
    });
  }
  render() {
    const classes = `day-row${this.state.isExpanded ? ' is-expanded ' : ' ' }center-contents`
    return (
      <li className={classes}>
          <div className="date">
            <button type="button" className="button ripple" onClick={() => this.toggleRowDetail()}>{ this.props.item.dateString }</button>
          </div>
          <div className="times">
            { this.getTimes(this.props.item.times) }
          </div>
          {
            this.state.isExpanded &&
            <div className="day-row-detail">
              OUTPUT LIST OF COUNTS BY TIME (I.E 1H, 3.5H ETC.) OF EACH CATEGORY FOR THAT DAY
            </div>
          }
      </li>
    );
  }
}

export default DayRow;
