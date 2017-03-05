import React, { Component } from 'react';
import categoryService from '../../actions/category-service';
import './category-edit.css';

class CategoryEdit extends Component {
  constructor() {
    super();
    this.state = {
      categoryString: '',
      categoryList: []
    };

  }
  componentDidMount() {
    categoryService.getCategoryList().then(list => {
      console.log('cat list: ', list);
      this.setState({ categoryList: list });
    });
  }
  handleCategoryClick(event) {
    event.stopPropagation();
    const value = event.target.id;
    this.props.handleCategorySelect(value);
  }
  handleUserInput(event) {
    const value = event.target.value;
    this.setState({ categoryString: value });
  }
  renderCategoryItem(item) {
    return (
      <li key={item.name}
          id={item.name}
          className="category-item ripple"
          role="button"
          onClick={(e) => this.handleCategoryClick(e)}>
        <span className={`preview-colour ${item.name}`}></span>
        <span>{item.name}</span>
      </li>
    );
  }
  filterOnSearch(categories) {
    if (!categories) return [];
    return categories.filter(item => item.name.indexOf(this.state.categoryString) > -1);
  }
  render() {
    const categoryItems = this.filterOnSearch(this.state.categoryList).map(item => this.renderCategoryItem(item));

    return (
      <div className="backdrop" onClick={() => this.props.handleCancelEdit()}>
        <div className="category-edit" onClick={(e) => { e.stopPropagation(); } }>
          <input type="text" placeholder="category..." autoComplete="false"
                 onChange={(e) => this.handleUserInput(e)} />
          <ul className="category-list">
            { categoryItems }
          </ul>
        </div>
      </div>
    );
  }
}

export default CategoryEdit;
