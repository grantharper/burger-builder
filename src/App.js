import React, {Component, Suspense} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from './store/actions/index';

const Orders = React.lazy(() => import('./containers/Orders/Orders'))

class App extends Component {

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {

    let authRoutes = Array.of(
      <Route key="/checkout" path="/checkout" component={Checkout}/>,
      <Route key="/orders" path="/orders" render={() => <Suspense fallback={<div>Loading...</div>}><Orders/></Suspense>} />,
      <Route key="/logout" path="/logout" component={Logout}/>,
      <Route key="/" path="/" exact component={BurgerBuilder}/>,
      <Redirect key="redirect" to="/" />
    );

    let publicRoutes = Array.of(
      <Route key="/auth" path="/auth" component={Auth}/>,
      <Route key="/" path="/" exact component={BurgerBuilder}/>,
      <Redirect key="redirect" to="/" />
    );

    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated ? authRoutes.concat(publicRoutes): publicRoutes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actionCreators.authCheckState())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
