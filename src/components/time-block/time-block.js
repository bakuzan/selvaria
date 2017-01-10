import React, { Component } from 'react';
import CategoryEdit from '../category-edit/category-edit';

class TimeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false
    };
  }
  handleClick() {
    this.setState({ isEditMode: true });
  }
  render() {
    const classColour = this.props.item.category ? ` ${this.props.item.category}` : '';

    return (
      <div className={`time-block${classColour}`} onClick={() => this.handleClick() }>
      {
        this.state.isEditMode && (
          <CategoryEdit />
        )
      }
      </div>
    );
  }
}

export default TimeBlock;
