import React, { Component } from 'react';
import CategoryService from '../../constants/category-service';
import './category-edit.css';

class CategoryEdit extends Component {
  constructor() {
    super();
    this.state = {
      categoryString: ''
    };
  }
  handleCategoryClick(event) {
    const value = event.target.id;
    this.props.handleCategorySelect(value);
  }
  handleUserInput(event) {
    const value = event.target.value;
    this.setState({ categoryString: value });
  }
  renderCategoryItem(item) {
    return (
      <li key={item.name} className="category-item ripple" id={item.name}
          onClick={(e) => this.handleCategoryClick(e)}>
        <span className={`preview-colour ${item.name}`}></span>
        <span>{item.name}</span>
      </li>
    );
  }
  render() {
    const categoryList = CategoryService.getCategoryList();
    const categoryItems = categoryList.filter(item => {
      return item.name.indexOf(this.state.categoryString) > -1;
    }).map(item => this.renderCategoryItem(item));

    return (
      <div className="category-edit">
        <input type="text" placeholder="category..." autoComplete="false"
               onChange={(e) => this.handleUserInput(e)} />
        <ul className="category-list">
          { categoryItems }
        </ul>
      </div>
    );
  }
}

export default CategoryEdit;
