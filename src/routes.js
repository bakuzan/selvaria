import React, { Component } from 'react';
import App from './views/app/app';
import Statistics from './views/statistics/statistics';
import About from './views/about/about';
import PageNotFound from './views/page-not-found/page-not-found';
import Home from './views/home/home';
import { paths } from './constants/paths';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Redirect from="/" to={paths.base} />

        <Route path={paths.base} component={App}>
          <IndexRoute component={Home} />

          <Route path={paths.statistics} component={Statistics} />
          <Route path={paths.about} component={About} />
        </Route>

        <Route path="*" component={PageNotFound} />
      </Router>
    );
  }
}

export default Routes;
