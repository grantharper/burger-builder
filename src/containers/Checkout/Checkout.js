import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    console.log('continue');
    this.props.history.push(this.props.match.path + '/contact-data');
  };

  render() {
    let summary = <Redirect to="/"/>;

    if (this.props.ingredients) {
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
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);