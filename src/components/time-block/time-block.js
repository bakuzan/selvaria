import React, { Component } from 'react';

class TimeBlock extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.item.category || !(nextProps.item.category === this.props.item.category);
  }
  
  handleClick(event) {
    if (!this.props.item.dateTime || !this.props.handleEditMode) return;

    const { clientX, clientY } = event;
    const editItem = Object.assign({}, {
      dateTime: this.props.item.dateTime,
      timeId: this.props.item.id,
      location: { clientX, clientY }
    });
    this.props.handleEditMode(editItem);
  }
  
  render() {
    const classColour = this.props.item && this.props.item.category ? ` ${this.props.item.category}` : '';
    const bstClass = this.props.item && !this.props.item.dateTime ? ' bst-placeholder' : '';

    return (
      <div className={`time-block${classColour}${bstClass}`}
           onClick={(e) => this.handleClick(e)}
           title={`${bstClass ? 'BST skipped hour' : ''}`}
      >
      </div>
    );
  }

}

export default TimeBlock;
