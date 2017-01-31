import React, { Component } from 'react';
import SelvariaSvg from '../selvaria-svg/selvaria-svg.js';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './header.css';
import '../../styles/ripple.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <nav className="application-header center-contents">
        <Link className="ripple" id="logo-svg" to={paths.base}>
          <SelvariaSvg />
        </Link>
        <h1>SELVARIA</h1>
        <div id="navigation-links">
          <div className="flex-right center-vertically">
            <Link className="ripple" to={`${paths.base}${paths.about}`}>
              About
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
