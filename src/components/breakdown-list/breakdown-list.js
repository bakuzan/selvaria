import React, { Component } from 'react';
import CategoryList from '../category-list/category-list';

class BreakdownList extends Component {
  renderBreakdownItems(breakdownItems) {
    return breakdownItems.map(item => {
      console.log('total - count breakdown item : ', item);
      const minMax = [item.min, item.max];
      return (
        <li key={item.category} className="breakdown-item">
          <span className={`preview-colour ${item.category}`}></span>
          <div className="breakdown-category">
            <span>
              { item.category }
            </span>
            <span>
              { `${(item.average / 2).toFixed(2)}h` }
            </span>
          </div>
          <CategoryList isHorizontal="true"
                        items={ minMax } />
        </li>
      );
    });
  }
  render() {
    const breakdownItems = this.renderBreakdownItems(this.props.items);

    return (
      <div>
        {
          !!this.props.title &&
          <h4 className="category-list-title">
            { this.props.title }
          </h4>
        }
        <ul className="breakdown-list">
          <li className="breakdown-item headers">
            <div>Average</div>
            <div>Maximum</div>
            <div>Minimum</div>
          </li>
          { breakdownItems }
        </ul>
      </div>
    );
  }
}

export default BreakdownList;
