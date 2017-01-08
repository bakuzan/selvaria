import React, { Component } from 'react';
import './selvaria-svg.css';

class SelvariaSvg extends Component {
  render() {
    return (
      <svg className="selvaria-svg" viewBox="-20 -60 80 80" preserveAspectRatio="xMaxYMax meet" xmlns="http://www.w3.org/2000/svg">
        <text className="letter hideshow" id="ess" x="0" y="-0">
          S
        </text>
        <text className="letter hideshow" id="ee" x="0" y="-0">
          E
        </text>
        <text className="letter hideshow" id="el" x="10" y="-0">
          L
        </text>
        <text className="letter hideshow" id="vee" x="9" y="-0">
          V
        </text>
        <text className="letter hideshow" id="eh" x="9" y="-0">
          A
        </text>
        <text className="letter hideshow" id="arr" x="9" y="-0">
          R
        </text>
        <text className="letter hideshow" id="eye" x="18" y="-0">
          I
        </text>
        <text className="letter hideshow" id="eh" x="9" y="-0">
          A
        </text>
        <text id="word" className="diagonal" x="-0" y="-0">
          BLES
        </text>
      </svg>
    );
  }
}

export default SelvariaSvg;
