import React, { Component } from 'react';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ActionBar from '../../components/action-bar/action-bar';
import CategoryList from '../../components/category-list/category-list';
import BreakdownList from '../../components/breakdown-list/breakdown-list';
import DayOfWeekItem from '../../components/day-of-week-item/day-of-week-item';
import TabContainer from '../../components/tab-container/tab-container';
import TabView from '../../components/tab-view/tab-view';
import BreakdownBarChart from '../../components/breakdown-bar-chart/breakdown-bar-chart';
import CountPieChart from '../../components/count-pie-chart/count-pie-chart';
import CommonService from '../../actions/common-service.js';
import StatisticsQuery from '../../actions/query/statistics-query';
import DataService from '../../actions/data-service.js';
import Constants from '../../constants/values';
import './statistics.css';

class Statistics extends Component {
  constructor() {
    super();
    const newDate = new Date();
    this.state = {
      totals: {},
      dayOfWeekCounts: [],
      loading: true,
      query: {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        date: newDate.getDate()
      },
      statisticsType: Constants.statisticsTypes.charts
    };

    this.updateSelectBox = this.updateSelectBox.bind(this);
    this.getStatisticsForQuery = this.getStatisticsForQuery.bind(this);
    this.toggleBreakdownForDay = this.toggleBreakdownForDay.bind(this);
  }
  componentDidMount() {
    this.getStatisticsForQuery();
  }
  getStatisticsForQuery() {
    if (!this.state.loading) this.setState({ loading: true });
    const query = this.state.query;
    StatisticsQuery.getBreakdownData(query).then(response => {
      console.log('res: ', response);
      this.setState({ ...response, loading: false });
    });
  }
  updateSelectBox(name, value) {
    const query = this.state.query;
    const updatedQuery = DataService.updateQueryValues(query, name, value);
    console.log('update: ', name, value, updatedQuery);
    this.setState({ query: updatedQuery })
  }
  changeStatisticsDisplay(event) {
    const { name } = event.target;
    const type = name.indexOf('Charts') > -1 ? Constants.statisticsTypes.charts : Constants.statisticsTypes.rawData;
    this.setState({ statisticsType: type });
  }
  toggleBreakdownForDay(dayName) {
    const state = this.state;
    const updatedState = update(state, {
      showDayOfWeekBreakdown: { $set: state.showDayOfWeekBreakdown === dayName ? null : dayName }
    });
    this.setState(updatedState);
  }
  renderDayOfWeekList(dayCounts, showCharts) {
    return dayCounts.map(item => {
      return (
        <DayOfWeekItem key={item.dayName}
                       item={item}
                       showDayOfWeekBreakdown={this.state.showDayOfWeekBreakdown}
                       showCharts={showCharts}
                       toggleBreakdown={this.toggleBreakdownForDay} />
      );
    });
  }
  render() {
    const queryString = CommonService.constructQueryText(this.state.query);
    const showStatisticsDisplay = (
      (this.state.totals && this.state.totals.counts && this.state.totals.counts.length > 0) ||
      (this.state.dayOfWeekCounts && this.state.dayOfWeekCounts.length > 0)
    );
    const showCharts = this.state.statisticsType === Constants.statisticsTypes.charts;
    const dayOfWeekCounts = this.renderDayOfWeekList(this.state.dayOfWeekCounts, showCharts);
    const pieChartData = this.state.totals.counts;
    const barChartData = this.state.totals.countsBreakdown;
    console.log('statistics render : ', this.state);
    // pie => width={730} height={250}
    // bar => width={730} height={250}
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
              <div className="display-radio-group">
                <label>
                  <input type="radio"
                         name="displayCharts"
                         value={this.state.statisticsType}
                         checked={this.state.statisticsType === Constants.statisticsTypes.charts}
                         onChange={(e) => this.changeStatisticsDisplay(e)} />
                  charts
                </label>
                <label>
                  <input type="radio"
                         name="displayRawData"
                         value={this.state.statisticsType}
                         checked={this.state.statisticsType === Constants.statisticsTypes.rawData}
                         onChange={(e) => this.changeStatisticsDisplay(e)} />
                  raw data
                </label>
              </div>
              <TabContainer>
                <TabView name="total">
                  <div className="flex-container full-width">
                    {
                      showCharts &&
                      <div className="flex-container full-width">
                        <CountPieChart counts={pieChartData} />
                        <BreakdownBarChart data={barChartData} />
                      </div>
                    }
                    {
                      !showCharts &&
                      <div className="flex-group">
                        <CategoryList title="Totals"
                                      items={this.state.totals.counts} />
                        <BreakdownList title="Breakdown"
                                       items={this.state.totals.countsBreakdown} />
                      </div>
                    }
                  </div>
                </TabView>
                <TabView name="by weekday">
                  <ul className={ `day-of-week-list${showCharts ? ' charts' : '' }` }>
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
