import React, { Component } from 'react';

class TabView extends Component {
  componentDidMount() {
    if (this.props.register) {
      this.props.register();
    }
  }
  render() {
    const isActive = this.props.isActive ? ' active' : '';
    return (
      <div className={`tab-view${isActive}`}>
      
      </div>
    );
  }
}

export default TabView;
