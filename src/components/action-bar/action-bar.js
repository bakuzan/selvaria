import React, { Component } from 'react';

class ActionBar extends Component {
  render() {
    return (
      <div className="action-bar">
        <form>
          <select id="year" value={this.state.query.year} onChange={(e) => this.updateSelectBox(e)}>
            <option value="2017">2017</option>
          </select>
          <select id="month" value={this.state.query.month} onChange={(e) => this.updateSelectBox(e)}>
            <option value="">ALL</option>
            <option value="0">JAN</option>
            <option value="1">FEB</option>
          </select>
          <button className="button primary ripple" type="button" onClick={ () => this.handleNextDayRequest() }>
            Add next day
          </button>
        </form>
      </div>
    );
  }
}

export default ActionBar;
