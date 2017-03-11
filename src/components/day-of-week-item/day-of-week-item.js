import React, { Component } from 'react';
import CategoryList from '../category-list/category-list';
import BreakdownList from '../breakdown-list/breakdown-list';
import BreakdownBarChart from '../breakdown-bar-chart/breakdown-bar-chart';
import CountPieChart from '../count-pie-chart/count-pie-chart';

class DayOfWeekItem extends Component {
  getBreakdownToDisplay(item, showCharts) {
    if (showCharts) return ( <BreakdownBarChart data={item.countsBreakdown} /> );
    return ( <BreakdownList title={`${item.dayName} breakdown`}
                            items={item.countsBreakdown} /> );
  }
  render() {
    const item = this.props.item;
    const daySelected = this.props.showDayOfWeekBreakdown === item.dayName;
    const showHideClass = !this.props.showDayOfWeekBreakdown || daySelected;
    const showCharts = this.props.showCharts;
    const breakdownDisplayForRender = this.getBreakdownToDisplay(item, showCharts);

    return (
      <li className={ `${showHideClass ? '' : 'hide'}` }>
        <div className={ `${showCharts ? 'flex-container' : 'flex-group'}` }>
          <div className="day-of-week-item-content">
            <h4>
              <button type="button"
                      className="button-link"
                      onClick={() => this.props.toggleBreakdown(item.dayName)}>
                { item.dayName }
              </button>
            </h4>
            {
              showCharts &&
              <CountPieChart counts={item.counts} />
            }
            {
              !showCharts &&
              <CategoryList items={item.counts} />
            }
          </div>
          {
            daySelected &&
            breakdownDisplayForRender
          }
        </div>
      </li>
    );
  }
}

export default DayOfWeekItem;
