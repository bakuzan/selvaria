import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import ChartService from '../../actions/chart-service';

class BreakdownBarChart extends Component {
  render() {
    const data = ChartService.mapCountsToChartData(this.props.data);

    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={ChartService.formatBarChartTooltip} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="minimum" fill="#f00" />
          <Bar dataKey="average" fill="#000" />
          <Bar dataKey="maximum" fill="#0f0" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BreakdownBarChart;
