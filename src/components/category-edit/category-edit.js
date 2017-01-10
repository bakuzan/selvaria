import React, { Component } from 'react';
import './category-edit.css';

class CategoryEdit extends Component {
  render() {
    const categoryList = [{ name: 'anime' }, { name: 'manga' }, { name: 'work' }, { name: 'wasted' }];

    return (
      <div className="category-edit">
        <input type="text" placeholder="category..." autocomplete="false" />
        <ul className="category-list">
          {
            categoryList.map(item => {
              return (
                <li key={item.name}>
                  <span className={`preview-colour ${item.name}`}></span>
                  {item.name}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default CategoryEdit;
