import React, { Component } from 'react';

class TimeBlock extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.item.category === this.props.item.category);
  }
  handleClick(event) {
    if (this.props.handleEditMode) {
      const { clientX, clientY } = event;
      const editItem = Object.assign({}, { 
        dateTime: this.props.item.dateTime, 
        timeId: this.props.item.id, 
        location: { clientX, clientY } 
      });
      this.props.handleEditMode(editItem);
    }
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';
    return (<div className={`time-block${classColour}`} onClick={(e) => this.handleClick(e)}></div>);
  }
}

export default TimeBlock;
