import React, { Component } from 'react';
import CommonService from '../../actions/common-service';

class CategoryItem extends Component {
  adjustPercentageLength(percentage) {
    const paddingLength = 7 - percentage.length;
    if (paddingLength === 0) return percentage;
    const percentageWithPad = CommonService.padNumber(percentage, 7);
    const percentageParts = CommonService.splitAt(paddingLength, percentageWithPad);

    return (
      <span>
        <span className="invisible-text">
          { percentageParts[0] }
        </span>
        { percentageParts[1] }
      </span>
    );
  }
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
            <span className="percentage">{ this.adjustPercentageLength(item.percentage) }</span>
          }
        </div>
      </li>
    );
  }
}

export default CategoryItem;
