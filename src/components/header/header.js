import React, { Component } from 'react';
import SvgLogo from '../svg-logo/svg-logo.js';
import { NavLink } from 'react-router-dom';
import { paths } from '../../constants/paths';
import './header.css';
import '../../styles/ripple.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <nav className="application-header center-contents">
        <NavLink className="ripple" id="logo-svg" to={paths.base}>
          <SvgLogo text="Selvaria" />
        </NavLink>
        <h1>SELVARIA</h1>
        <div id="navigation-links">
          <div className="flex-right">
            <NavLink className="ripple center-contents"
                  activeClassName="active"
                  to={`${paths.base}${paths.statistics}`}>
              Statistics
            </NavLink>
            <NavLink className="ripple center-contents"
                  activeClassName="active"
                  to={`${paths.base}${paths.about}`}>
              About
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
