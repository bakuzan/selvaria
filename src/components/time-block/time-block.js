import React, { Component } from 'react';
import CategoryEdit from '../category-edit/category-edit';

class TimeBlock extends Component {
  constructor(props) {
    super(props);

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }
  handleClick() {
    this.props.handleEditMode(this.props.item.day, this.props.item.id);
  }
  handleCategorySelect(category) {
    this.props.handleAssignCategory(this.props.item.day, this.props.item.id, category);
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';

    return (
      <div className={`time-block${classColour}`} onClick={() => this.handleClick()}>
      {
        this.props.item.isEditMode && (
          <CategoryEdit handleCategorySelect={this.handleCategorySelect} />
        )
      }
      </div>
    );
  }
}

export default TimeBlock;
