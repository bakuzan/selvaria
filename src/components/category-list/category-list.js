import React, { Component } from 'react';
import CategoryItem from '../category-item/category-item';

class CategoryList extends Component {
  renderItems(items) {
    return items.map((item, index) => {
      return (
        <CategoryItem key={item.category} item={item} />
      );
    });
  }
  render() {
    const categoryItems = this.renderItems(this.props.items);
    
    return (
      <ul className="category-list>
      { categoryItems }
      </ul>
    );
  }
}

export default CategoryList;
