import React, { Component } from 'react';
import HelpBox from '../help-box/help-box';
import CommonService from '../../actions/common-service';
import Constants from '../../constants/values';
import './action-bar.css';

class ActionBar extends Component {
  populateYears() {
    const years = [];
    let year = new Date().getFullYear();
    while (year >= Constants.yearZero) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
      year--;
    }
    return years;
  }
  populateMonths() {
    const monthNames = Constants.monthNames.short.slice(0);
    const months = monthNames.map((item, index) => {
      return (
        <option key={index} value={index}>
          {item.toUpperCase()}
        </option>
      );
    });
    return [
      <option key="default" value="">
        ALL
      </option>
    ].concat(months);
  }
  populateDates() {
    const defaultOption = [
      <option key="default" value="">
        ALL
      </option>
    ];
    if (this.props.month === '') return defaultOption;
    const daysInMonth = CommonService.daysInMonth(
      this.props.year,
      this.props.month
    );
    const days = Array(daysInMonth)
      .fill(null)
      .map((item, index) => {
        const date = index + 1;
        return (
          <option key={index} value={date}>
            {date}
          </option>
        );
      });
    return defaultOption.concat(days);
  }
  handleSelectBox(event) {
    const { name, value } = event.target;
    this.props.updateSelectBox(name, value);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.query();
  }
  render() {
    const showAddNextDayButton = !!this.props.handleNextDayRequest;
    const years = this.populateYears();
    const months = this.populateMonths();
    const dates = this.populateDates();
    // console.log('render action bar: ', this.props, years, months);
    return (
      <div className="action-bar">
        <HelpBox>
          <p>
            <i>year &nbsp;&nbsp;</i>Query by year.
          </p>
          <p>
            <i>month</i>Query by month.
          </p>
          <p>
            <i>date &nbsp;&nbsp;</i>Query returns week of the date and last
            week.
          </p>
        </HelpBox>
        <form onSubmit={event => this.handleSubmit(event)}>
          <button className="button primary ripple bold" type="submit">
            Query
          </button>
          <div className="action-container">
            <label htmlFor="year">year</label>
            <select
              id="year"
              className="select-box"
              name="year"
              value={this.props.year}
              onChange={e => this.handleSelectBox(e)}
            >
              {years}
            </select>
          </div>
          <div className="action-container">
            <label htmlFor="month">month</label>
            <select
              id="month"
              className="select-box"
              name="month"
              value={this.props.month}
              onChange={e => this.handleSelectBox(e)}
            >
              {months}
            </select>
          </div>
          <div className="action-container">
            <label htmlFor="date">date</label>
            <select
              id="date"
              className="select-box"
              name="date"
              disabled={dates.length === 1}
              value={this.props.date}
              onChange={e => this.handleSelectBox(e)}
            >
              {dates}
            </select>
          </div>
        </form>
        {showAddNextDayButton && (
          <button
            className="button ripple"
            type="button"
            onClick={() => this.props.handleNextDayRequest()}
          >
            Add next day
          </button>
        )}
      </div>
    );
  }
}

export default ActionBar;
