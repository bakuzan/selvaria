import React, { Component } from 'react';

class TimeBlock extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.item.category === this.props.item.category);
  }
  handleClick() {
    if (this.props.handleEditMode) {
      this.props.handleEditMode(this.props.item.dateTime, this.props.item.id);
    }
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';
    return (<div className={`time-block${classColour}`} onClick={() => this.handleClick()}></div>);
  }
}

export default TimeBlock;
