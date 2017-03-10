import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ChartService from '../../actions/chart-service';
import Constants from '../../constants/values';

class CountPieChart extends Component { 
  constructor() {
    super();
    this.state = {
      activeIndex: 0
    };
    
    this.onPieEnter = this.onPieEnter.bind(this);
  }
  renderCells(counts) {
    return counts.map((entry, index) => {
      const colour = Constants.colours.find(x => x.name === entry.category);
      const value = colour ? colour.value : '#000';
      return ( <Cell key={index} fill={value}/> );
    });
  }
  onPieEnter(data, index) {
    this.setState({ activeIndex: index });
  }
  render() {
    const pieChartData = ChartService.mapCountsToPieData(this.props.counts);
    const cells = this.renderCells(pieChartData);
      
    return (
      <ResponsiveContainer width="35%" height={250}>
        <PieChart onMouseEnter={this.onPieEnter}>
        <Pie activeIndex={this.state.activeIndex}
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
            cells
          }
        </Pie>
      </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default CountPieChart
