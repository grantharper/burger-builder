import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from './store/actions/index';


class App extends Component {

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actionCreators.authCheckState())
  }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
