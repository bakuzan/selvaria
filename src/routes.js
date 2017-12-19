import React, { Component } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import App from './views/app/app';
import Statistics from './views/statistics/statistics';
import About from './views/about/about';
import PageNotFound from './views/page-not-found/page-not-found';
import Home from './views/home/home';
import { paths } from './constants/paths';


const history = createHistory()

const SelvariaRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={Home} />

    <Route path={`${match.path}${paths.statistics}`} component={Statistics} />
    <Route path={`${match.path}${paths.about}`} component={About} />
  </Switch>
)

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Redirect exact from="/" to={paths.base} />
            <Route path={paths.base} component={SelvariaRoutes} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default Routes;
