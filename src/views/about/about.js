import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { paths } from '../../constants/paths';
import './about.scss';

class About extends Component {
  render() {
    return (
      <article className="about">
        <header>
          <h2>Project SELVARIA</h2>
          <p className="subtitle">Selvaria is a timesheet application.</p>
        </header>
        <div className="content">
          <NavLink to={paths.base}>Home</NavLink> Start the timesheet!
        </div>
      </article>
    );
  }
}

export default About;
