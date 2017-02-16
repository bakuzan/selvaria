import React, { Component } from 'react';

class HelpBox extends Component {
  render() {
    return (
      <div className="help-box">
        <button type="button" className="help-button" title="Click to get help about this">
          <span className="help-icon">?</span>
          <div className="help-content">
            { this.props.children }
          </div>
        </button>
      </div>
    );
  }
}

export default HelpBox;
