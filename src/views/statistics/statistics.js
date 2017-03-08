import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ActionBar from '../../components/action-bar/action-bar';
import CategoryList from '../../components/category-list/category-list';
import BreakdownList from '../../components/breakdown-list/breakdown-list';
import TabContainer from '../../components/tab-container/tab-container';
import TabView from '../../components/tab-view/tab-view';
import CommonService from '../../actions/common-service.js';
import StatisticsQuery from '../../actions/query/statistics-query';
import DataService from '../../actions/data-service.js';
import './statistics.css';

class Statistics extends Component {
  constructor() {
    super();
    const newDate = new Date();
    this.state = {
      statistics: {
        queryCounts: {},
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
    if (!this.state.loading) this.setState({ loading: true });
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
  toggleBreakdownForDay(dayName) {
    const state = this.state;
    const updatedState = update(state, {
      showDayOfWeekBreakdown: { $set: state.showDayOfWeekBreakdown === dayName ? null : dayName }
    });
    this.setState(updatedState);
  }
  renderDayOfWeekList(dayCounts) {
    return dayCounts.map(item => {
      const daySelected = this.state.showDayOfWeekBreakdown === item.dayName;
      const showHideClass = !this.state.showDayOfWeekBreakdown || daySelected;

      return (
        <li key={item.dayName} className={ `${showHideClass ? '' : 'hide'}` }>
          <div className="row">
            <div>
              <h4>
                <button type="button"
                        className="button-link"
                        onClick={() => this.toggleBreakdownForDay(item.dayName)}>
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
    })
  }
  render() {
    const queryString = CommonService.constructQueryText(this.state.query);
    const showStatisticsDisplay = (
      (this.state.statistics.queryCounts && this.state.statistics.queryCounts.counts && this.state.statistics.queryCounts.counts.length > 0) ||
      (this.state.statistics.dayOfWeekCounts && this.state.statistics.dayOfWeekCounts.length > 0)
    );
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
              <TabContainer>
                <TabView name="total">
                  <CategoryList title="Totals"
                                items={this.state.statistics.queryCounts.counts} />
                  <BreakdownList title="Breakdown"
                                 items={this.state.statistics.queryCounts.countsBreakdown} />
                </TabView>
                <TabView name="by weekday">
                  <ul className="day-of-week-list">
                  { dayOfWeekCounts }
                  </ul>
                </TabView>
              </TabContainer>
            </div>
          }
        </div>
      }
      </div>
    );
  }
}

export default Statistics;
