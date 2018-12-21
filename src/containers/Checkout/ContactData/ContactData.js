import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Aux/Aux';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: 'Grant',
        address: {
          street: 'fake street',
          zipCode: '97653',
          country: 'Wakanda'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'bike'
    };

    //simulate latency with setTimeout
    // setTimeout(() => {
    axios.post('/orders.json', order)
    .then(response => {
      console.log(response);
      this.props.history.push('/');
      this.setState({
        loading: false
      });
    }).catch(error => {
      console.log(error);
      this.props.history.push('/');
      this.setState({
        loading: false
      });
    });
    // }, 2000);
  };

  render() {
    let displayOutput = (
    <Aux>
      <h4>Enter your contact data</h4>
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    </Aux>

    );
    if (this.state.loading) {
      displayOutput = <Spinner/>
    }

    return (
    <div className={classes.ContactData}>
      {displayOutput}
    </div>
    );
  }
}

export default ContactData;