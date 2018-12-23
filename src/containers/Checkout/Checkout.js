import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

  componentWillMount() {
    this.props.onPurchaseInit();
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    console.log('continue');
    this.props.history.push(this.props.match.path + '/contact-data');
  };

  render() {
    let summary = <Redirect to="/"/>;

    if (this.props.ingredients && !this.props.purchased) {
      summary = (
      <div>
        <CheckoutSummary
        ingredients={this.props.ingredients}
        cancel={this.cancelHandler}
        continue={this.continueHandler}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
      );
    }

    return summary;
  }

}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);