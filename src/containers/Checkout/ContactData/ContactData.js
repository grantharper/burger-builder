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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
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
    const formData = {};
    for(let formElementId in this.state.orderForm){
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: formData
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

  checkValidity(value, rules){
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, formElementId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {...updatedOrderForm[formElementId]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[formElementId] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({orderForm: updatedOrderForm});
  };

  render() {
    let inputElements = [];
    for(let orderElement in this.state.orderForm){
      let element = {
        ...this.state.orderForm[orderElement],
      };
      element.elementConfig.name = orderElement;

      inputElements.push(<Input
      shouldValidate={this.state.orderForm[orderElement].validation}
      invalid={!this.state.orderForm[orderElement].valid}
      touched={this.state.orderForm[orderElement].touched}
      changed={(event) => this.inputChangedHandler(event, orderElement)}
      key={orderElement}
      elementType={element.elementType}
      elementConfig={element.elementConfig}
      value={element.value}/>);
    }


    let displayOutput = (
    <Aux>
      <h4>Enter your contact data</h4>
      <form onSubmit={this.orderHandler}>
        {inputElements}
        <Button btnType="Success">Order</Button>
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