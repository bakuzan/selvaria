import React, { Component } from 'react';
import './selvaria-svg.css';

class SelvariaSvg extends Component {
  render() {
    return (
      <svg className="selvaria-svg" viewBox="-20 -60 80 80" preserveAspectRatio="xMaxYMax meet" xmlns="http://www.w3.org/2000/svg">
        <text className="letter hideshow" x="-3" y="-0">
          S
        </text>
        <text className="letter hideshow" x="-3" y="-0">
          E
        </text>
        <text className="letter hideshow" x="-2" y="-0">
          L
        </text>
        <text className="letter hideshow" x="-4" y="-0">
          V
        </text>
        <text className="letter hideshow" x="-4" y="-0">
          A
        </text>
        <text className="letter hideshow" x="-6" y="-0">
          R
        </text>
        <text className="letter hideshow" x="10" y="-0">
          I
        </text>
        <text className="letter hideshow" x="-4" y="-0">
          A
        </text>
        <text className="diagonal" x="-0" y="-0" id="word">
          SELVARIA
        </text>
      </svg>
    );
  }
}

export default SelvariaSvg;
