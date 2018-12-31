import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreators from '../../../store/actions/index';

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
        value: 'fastest',
        valid: true,
        validation: {}
      }
    },
    formIsValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      userId: this.props.userId,
      orderData: formData
    };

    this.props.onIngredientsInit();
    console.log('[ContactData] orderHandler init ingredients');
    this.props.onOrderSubmit(order, this.props.token);
    console.log('[ContactData] orderHandler submitted order');
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
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

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  };

  render() {
    let inputElements = [];
    for (let orderElement in this.state.orderForm) {
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    </Aux>

    );
    if (this.props.loading) {
      displayOutput = <Spinner/>
    }

    return (
    <div className={classes.ContactData}>
      {displayOutput}
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderSubmit: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token)),
    onIngredientsInit: () => dispatch(actionCreators.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));