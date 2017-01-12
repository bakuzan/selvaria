import React, { Component } from 'react';
import CategoryEdit from '../category-edit/category-edit';

class TimeBlock extends Component {
  handleClick() {
    this.props.handleEditMode(this.props.item.id);
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';

    return (
      <div className={`time-block${classColour}`} onClick={this.handleClick()}>
      {
        this.props.item.isEditMode && (
          <CategoryEdit handleCategorySelect={this.props.handleAssignCategory} />
        )
      }
      </div>
    );
  }
}

export default TimeBlock;
