import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import update from 'immutability-helper';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ActionBar from '../../components/action-bar/action-bar';
import CategoryList from '../../components/category-list/category-list';
import BreakdownList from '../../components/breakdown-list/breakdown-list';
import DayOfWeekItem from '../../components/day-of-week-item/day-of-week-item';
import TabContainer from '../../components/tab-container/tab-container';
import TabView from '../../components/tab-view/tab-view';
import CommonService from '../../actions/common-service.js';
import ChartService from '../../actions/chart-service.js';
import StatisticsQuery from '../../actions/query/statistics-query';
import DataService from '../../actions/data-service.js';
import Constants from '../../constants/values';
import './statistics.css';

class Statistics extends Component {
  constructor() {
    super();
    const newDate = new Date();
    this.state = {
      activePieSectorIndex: 0,
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

    this.onPieEnter = this.onPieEnter.bind(this);
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
  onPieEnter(data, index) {
    this.setState({ activePieSectorIndex: index });
  }
  renderDayOfWeekList(dayCounts) {
    return dayCounts.map(item => {
      return (
        <DayOfWeekItem key={item.dayName}
                       item={item}
                       showDayOfWeekBreakdown={this.state.showDayOfWeekBreakdown}
                       toggleBreakdown={this.toggleBreakdownForDay} />
      );
    });
  }
  render() {
    const queryString = CommonService.constructQueryText(this.state.query);
    const showStatisticsDisplay = (
      (this.state.statistics.queryCounts && this.state.statistics.queryCounts.counts && this.state.statistics.queryCounts.counts.length > 0) ||
      (this.state.statistics.dayOfWeekCounts && this.state.statistics.dayOfWeekCounts.length > 0)
    );
    const dayOfWeekCounts = this.renderDayOfWeekList(this.state.statistics.dayOfWeekCounts);
    const pieChartData = ChartService.mapCountsToPieData(this.state.statistics.queryCounts.counts);
    const barChartData = ChartService.mapCountsToChartData(this.state.statistics.queryCounts.countsBreakdown);
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
              <TabContainer>
                <TabView name="total">
                  <div className="flex-container">
                    <div className="flex-group full-row">
                      <ResponsiveContainer width="35%" height={250}>
                        <PieChart onMouseEnter={this.onPieEnter}>
                          <Pie activeIndex={this.state.activePieSectorIndex}
                               activeShape={ChartService.renderPieActiveShape}
                               data={pieChartData}
                               nameKey="category"
                               valueKey="count"
                               cx="50%"
                               cy="50%"
                               paddingAngle={5}
                               innerRadius={30}
                               outerRadius={90}
                               fill="#000">
                          {
                            pieChartData.map((entry, index) => {
                              const colour = Constants.colours.find(x => x.name === entry.category);
                              const value = colour ? colour.value : '#000';
                              return ( <Cell key={index} fill={value}/> );
                            })
                          }
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="65%" height={250}>
                        <BarChart data={barChartData}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip formatter={ChartService.formatBarChartTooltip} />
                          <Legend verticalAlign="top" height={36} />
                          <Bar dataKey="minimum" unit="h" fill="#f00" />
                          <Bar dataKey="average" unit="h" fill="#000" />
                          <Bar dataKey="maximum" unit="h" fill="#0f0" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-group">
                      <CategoryList title="Totals"
                                    items={this.state.statistics.queryCounts.counts} />
                      <BreakdownList title="Breakdown"
                                     items={this.state.statistics.queryCounts.countsBreakdown} />
                    </div>
                  </div>
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
