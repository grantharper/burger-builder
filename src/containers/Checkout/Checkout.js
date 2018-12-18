import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    }
  };

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    console.log('continue');
    this.props.history.push('/order-summary');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
        ingredients={this.state.ingredients}
        cancel={this.cancelHandler}
        continue={this.continueHandler}/>
      </div>
    );
  }

}

export default Checkout;