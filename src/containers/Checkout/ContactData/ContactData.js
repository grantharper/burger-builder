import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
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
    let inputElements = [];
    for(let orderElement in this.state.orderForm){
      let element = {
        ...this.state.orderForm[orderElement],
      };
      element.elementConfig.name = orderElement;

      inputElements.push(<Input elementType={element.elementType} elementConfig={element.elementConfig} value={element.value}/>);
    }


    let displayOutput = (
    <Aux>
      <h4>Enter your contact data</h4>
      <form>
        {inputElements}
        {/*<Input elementType="..." elementConfig="..." value="..."/>*/}
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