import React, { Component } from 'react';
import Constants from '../../constants/values';
import './action-bar.css';

class ActionBar extends Component {
  populateYears() {
    const years = [];
    let year = new Date().getFullYear();
    while(year >= Constants.yearZero) {
      years.push(<option key={year} value={year}>{year}</option>);
      year--;
    }
    return years;
  }
  populateMonths() {
    const monthNames = Constants.monthNames.slice(0);
    const months = monthNames.map((item, index) => {
      return (<option key={index} value={index}>{ item.toUpperCase() }</option>);
    });
    return [<option key="default" value="">ALL</option>].concat(months);
  }
  render() {
    const years = this.populateYears();
    const months = this.populateMonths();
    const usingCurrentPeriod = this.props.date !== '';
    console.log('render action bar: ', this.props, years, months);
    return (
      <div className="action-bar">
        <div className="help-box">
          <button type="button" className="help-icon">
          ?
          <div className="help-content">
            <p><i>year</i> Query by year.</p>
            <p><i>month</i> Query by month.</p>
            <p><i>period</i> Query returns week of the date and last week. Ignores year and month.</p>
          </div>
          </button>
        </div>
        <form>
          <button className="button primary ripple bold" type="button" onClick={ () => this.props.query() }>
            Query
          </button>
          <div className="action-container">
            <label>year</label>
            <select id="year" className="select-box" disabled={ usingCurrentPeriod }
                    value={this.props.year} onChange={(e) => this.props.updateSelectBox(e)}>
              { years }
            </select>
          </div>
          <div className="action-container">
            <label>month</label>
            <select id="month" className="select-box" disabled={ usingCurrentPeriod }
                    value={this.props.month} onChange={(e) => this.props.updateSelectBox(e)}>
              { months }
            </select>
          </div>
          <div className="action-container">
            <label>period</label>
            <input id="date" type="date" placeholder="date"
                   value={this.props.date} onChange={(e) => this.props.updateSelectBox(e)} />
          </div>
          <button className="button ripple" type="button" onClick={ () => this.props.handleNextDayRequest() }>
            Add next day
          </button>
        </form>
      </div>
    );
  }
}

export default ActionBar;
