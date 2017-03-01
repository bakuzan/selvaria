import React, { Component } from 'react';

class CategoryItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <li className="category-item">
        <span className={`preview-colour ${item.category}`}></span>
        <span>{item.category || 'uncategorised'}</span>
        <div className="category-item-data">
          <span className="time-spent">{ item.hours }</span>
          {
            !!item.percentage &&
            <span className="percentage">{ item.percentage }</span>
          }
        </div>
      </li>
    );
  }
}

export default CategoryItem;
