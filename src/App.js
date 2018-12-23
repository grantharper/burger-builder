import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

class App extends Component {

  render() {
    return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/" component={BurgerBuilder}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
