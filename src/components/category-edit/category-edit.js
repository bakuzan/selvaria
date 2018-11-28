import React, { Component } from 'react';
import CategoryPortal from './category-portal';
import commonService from '../../actions/common-service';
import categoryService from '../../actions/category-service';
import '../category-list/category-list.scss';
import './category-edit.scss';

class CategoryEdit extends Component {
  constructor() {
    super();
    this.state = {
      categoryString: '',
      categoryList: []
    };
  }
  componentDidMount() {
    categoryService.getCategoryList().then((list) => {
      console.log('cat list: ', list);
      this.setState({ categoryList: list });
    });
  }
  handleCategoryClick(event, categoryName) {
    event.stopPropagation();
    this.props.handleCategorySelect(categoryName);
  }
  handleUserInput(event) {
    const value = event.target.value;
    this.setState({ categoryString: value });
  }
  renderCategoryItem(item) {
    return (
      <li
        key={item.name}
        id={item.name}
        className="category-item ripple"
        role="button"
        onClick={(e) => this.handleCategoryClick(e, item.name)}
      >
        <span className={`preview-colour ${item.name}`} />
        <span>{item.name}</span>
      </li>
    );
  }
  filterOnSearch(categories) {
    if (!categories) return [];
    return categories.filter(
      (item) => item.name.indexOf(this.state.categoryString) > -1
    );
  }
  render() {
    const categoryItems = this.filterOnSearch(this.state.categoryList).map(
      (item) => this.renderCategoryItem(item)
    );
    const { dateTime, location: { clientX, clientY } } = this.props.editItem;
    const positioningStyle = Object.assign(
      {},
      { top: `${clientY}px`, left: `${clientX}px` }
    );
    const formattedTimeBlockDateTime = commonService.formatDateAndTime(
      new Date(dateTime)
    );

    return (
      <CategoryPortal>
        <div className="backdrop" onClick={this.props.handleCancelEdit} />
        <div
          className="category-edit"
          style={positioningStyle}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h4 className="category-edit-title">{formattedTimeBlockDateTime}</h4>
          <input
            type="text"
            placeholder="category..."
            autoComplete="false"
            onChange={this.handleUserInput}
          />
          <ul className="category-list">{categoryItems}</ul>
        </div>
      </CategoryPortal>
    );
  }
}

export default CategoryEdit;
