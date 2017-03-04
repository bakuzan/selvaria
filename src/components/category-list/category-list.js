import React, { Component } from 'react';
import CategoryItem from '../category-item/category-item';
import './category-list.css';

class CategoryList extends Component {
  renderItems(items) {
    const sortedItems = items.sort((obj1, obj2) => {
      if (obj1.count > obj2.count) return -1;
      if (obj1.count < obj2.count) return 1;
      return 0;
    });

    return sortedItems.map(item => {
      return (
        <CategoryItem key={item.category} item={item} />
      );
    });
  }
  render() {
    const categoryItems = this.renderItems(this.props.items);

    return (
      <ul className="category-list">
      { categoryItems }
      </ul>
    );
  }
}

export default CategoryList;
