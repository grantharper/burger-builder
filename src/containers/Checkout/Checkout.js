import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()){
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }

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