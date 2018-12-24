import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/index';


class Auth extends Component {

  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
    }
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

  inputChangedHandler(event, formElementId){
    const updatedControls = {
      ...this.state.controls
    };
    const updatedFormElement = {...updatedControls[formElementId]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedControls[formElementId] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({controls: updatedControls, formIsValid: formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {

    let inputElements = [];
    for (let control in this.state.controls) {
      let element = {
        ...this.state.controls[control],
      };
      element.elementConfig.name = control;

      const controlItem = this.state.controls[control];

      inputElements.push(<Input
      shouldValidate={controlItem.validation}
      invalid={!controlItem.valid}
      touched={controlItem.touched}
      changed={(event) => this.inputChangedHandler(event, control)}
      key={control}
      elementType={element.elementType}
      elementConfig={element.elementConfig}
      value={element.value}/>);
    }


    return (
    <div className={classes.Auth}>
      <form onSubmit={this.submitHandler}>
        {inputElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
      </form>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actionCreators.auth(email, password))
  }
};

export default connect(null, mapDispatchToProps)(Auth);
