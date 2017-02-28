import React, { Component } from 'react';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ActionBar from '../../components/action-bar/action-bar';
import CategoryList from '../../components/category-list/category-list';
import CommonService from '../../actions/common-service.js';
import StatisticsQuery from '../../actions/query/statistics-query';
import DataService from '../../actions/data-service.js';

class Statistics extends Component {
  constructor() {
    super();
    const newDate = new Date();
    this.state = {
      statistics: {
        queryCounts: [],
        dayOfWeekCounts: []
      },
      loading: true,
      query: {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate()
      }
    };

    this.updateSelectBox = this.updateSelectBox.bind(this);
    this.getStatisticsForQuery = this.getStatisticsForQuery.bind(this);
  }
  componentDidMount() {
    this.getStatisticsForQuery();
  }
  getStatisticsForQuery() {
    const query = this.state.query;
    StatisticsQuery.getBreakdownData(query).then(response => {
      this.setState({ statistics: response, loading: false });
    });
  }
  updateSelectBox(name, value) {
    const query = this.state.query;
    const updatedQuery = DataService.updateQueryValues(query, name, value);
    console.log('update: ', name, value, updatedQuery);
    this.setState({ query: updatedQuery })
  }
  renderDayOfWeekList(dayCounts) {
    return dayCounts.map(item => {
      return (
        <li key={item.dayName}>
          <span>{item.dayName}</span>
          <CategoryList items={item.counts} />
        </li>
      );
    })
  }
  render() {
    const queryString = CommonService.constructQueryText(this.state.query);
    const showStatisticsDisplay = this.state.statistics.queryCounts.length > 0 || this.state.statistics.dayOfWeekCounts.length > 0;
    const dayOfWeekCounts = this.renderDayOfWeekList(this.state.statistics.dayOfWeekCounts);
    console.log('statistics render : ', this.state);

    return (
      <div id="statistics">
      {
        this.state.loading &&
        <LoadingSpinner size="fullscreen" />
      }
      {
        !this.state.loading &&
        <div>
          <div className="flex-row">
            <header className="flex-column">
              <h2 className="margin-0">
                Statistics
              </h2>
              <p className="subtitle keep-line-breaks">
              {
                `Query data for
                ${queryString}`
              }
              </p>
            </header>
            <div className="width-75 margin-left-auto">
              <ActionBar {...this.state.query}
                         query={this.getStatisticsForQuery}
                         updateSelectBox={this.updateSelectBox} />
            </div>
          </div>
          {
            showStatisticsDisplay &&
            <div className="category-detail">
              <CategoryList items={this.state.statistics.queryCounts} />
              <ul className="day-of-week-list">
              { dayOfWeekCounts }
              </ul>
            </div>
          }
        </div>
      }
      </div>
    );
  }
}

export default Statistics;
