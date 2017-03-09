import React, { Component } from 'react';
import CategoryList from '../category-list/category-list';
import BreakdownList from '../breakdown-list/breakdown-list';

class DayOfWeekItem extends Component {
  render() {
    const item = this.props.item;
    const daySelected = this.props.showDayOfWeekBreakdown === item.dayName;
    const showHideClass = !this.props.showDayOfWeekBreakdown || daySelected;

    return (
      <li className={ `${showHideClass ? '' : 'hide'}` }>
        <div className="row">
          <div>
            <h4>
              <button type="button"
                      className="button-link"
                      onClick={() => this.props.toggleBreakdown(item.dayName)}>
                { item.dayName }
              </button>
            </h4>
            <CategoryList items={item.counts} />
          </div>
          {
            daySelected &&
            <BreakdownList title={`${item.dayName} breakdown`}
                           items={item.countsBreakdown} />
          }
        </div>
      </li>
    );
  }
}

export default DayOfWeekItem;
