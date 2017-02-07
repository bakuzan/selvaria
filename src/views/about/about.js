import React, { Component } from 'react';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './about.css';

class About extends Component {
  render() {
    return (
      <article className="about">
        <header>
          <h2>Project SELVARIA</h2>
          <p className="subtitle">Selvaria is a timesheet application.</p>
        </header>
        <div className="content">
          <Link to={paths.base}>Home</Link> Start the timesheet!
        </div>
      </article>
    );
  }
}

export default About;
