import PropTypes from 'prop-types';
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
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default TabView;
