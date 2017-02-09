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
    console.log('render action bar: ', this.props, years, months);
    return (
      <div className="action-bar">
        <form>
          <button className="button primary ripple bold" type="button" onClick={ () => this.props.query() }>
            Query
          </button>
          <select id="year" className="select-box" value={this.props.year} onChange={(e) => this.props.updateSelectBox(e)}>
            { years }
          </select>
          <select id="month" className="select-box" value={this.props.month} onChange={(e) => this.props.updateSelectBox(e)}>
            { months }
          </select>
          <button className="button ripple" type="button" onClick={ () => this.props.handleNextDayRequest() }>
            Add next day
          </button>
        </form>
      </div>
    );
  }
}

export default ActionBar;
