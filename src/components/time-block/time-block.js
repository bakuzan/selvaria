import React, { Component } from 'react';

class TimeBlock extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.item.category === this.props.item.category);
  }
  handleClick(event) {
    console.log('click on time block : ', event, event.shiftKey);
    if (this.props.handleEditMode) {
      this.props.handleEditMode(this.props.item.dateTime, this.props.item.id);
    }
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';
    return (<div className={`time-block${classColour}`} onClick={(e) => this.handleClick(e)}></div>);
  }
}

export default TimeBlock;
