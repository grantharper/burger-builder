import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()){
      if(param[0] === 'totalPrice'){
        this.setState({price: param[1]});
      }else{
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients});
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    console.log('continue');
    this.props.history.push(this.props.match.path + '/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
        ingredients={this.state.ingredients}
        cancel={this.cancelHandler}
        continue={this.continueHandler}/>
        <Route path={this.props.match.path + '/contact-data'}
        render={() => <ContactData price={this.state.price} ingredients={this.state.ingredients} {...this.props}/>} />
      </div>
    );
  }

}

export default Checkout;