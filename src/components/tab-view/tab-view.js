import React, { Component } from 'react';

class TabView extends Component {
  render() {
    const isActive = this.props.isActive ? ' active' : '';
    return (
      <div className={`tab-view${isActive}`} role="tabpanel">
      { this.props.children }
      </div>
    );
  }
}

TabView.defaultProps = {
  isActive: false
};
TabView.propTypes = {
  name: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool,
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TabView;
