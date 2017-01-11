import React, { Component } from 'react';
import './category-edit.css';

class CategoryEdit extends Component {
  render() {
    const categoryList = [{ name: 'anime' }, { name: 'manga' }, { name: 'work' }, { name: 'wasted' }];
    const categoryItems = categoryList.map(item => {
      if (item.name.indexOf('') === -1) continue;

      return (
        <li key={item.name} className="category-item">
          <span className={`preview-colour ${item.name}`}></span>
          <span>{item.name}</span>
        </li>
      );
    });

    return (
      <div className="category-edit">
        <input type="text" placeholder="category..." autoComplete="false" />
        <ul className="category-list">
          {

          }
        </ul>
      </div>
    );
  }
}

export default CategoryEdit;
