import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import createHistory from 'history/createBrowserHistory';

import App from './views/app/app';
import LoadingSpinner from './components/loading-spinner/loading-spinner';
import { paths } from './constants/paths';

const history = createHistory();

function Loading(props) {
  if (props.error) return <div>An Error was encountered loading the page!</div>;
  if (props.pastDelay) return <LoadingSpinner size="fullscreen" />;
  return null;
}
const loadableSettings = { loading: Loading, delay: 300 };
const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './views/home/home'),
  ...loadableSettings
});
const Statistics = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'statistics' */ './views/statistics/statistics'),
  ...loadableSettings
});
const About = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './views/about/about'),
  ...loadableSettings
});
const PageNotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'page-not-found' */ './views/page-not-found/page-not-found'),
  ...loadableSettings
});

const SelvariaRoutes = ({ match }) => (
  <Switch>
    <Route exact path={match.path} component={Home} />

    <Route path={`${match.path}${paths.statistics}`} component={Statistics} />
    <Route path={`${match.path}${paths.about}`} component={About} />
  </Switch>
);

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
