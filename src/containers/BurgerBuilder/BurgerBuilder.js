import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios.get('/ingredients.json').then(response => {
    //   this.setState({ingredients: response.data});
    // }).catch(error => {
    //   this.setState({error: true});
    // })
  }

  isPurchaseable () {
    const ingredients = {...this.props.ingredients};
    const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    console.log(this.props);

    const queryParams = [];
    for(let ingredient in this.props.ingredients) {
      queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ingredients[ingredient]));
    }
    queryParams.push('totalPrice=' + this.props.totalPrice);

    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryParams.join('&')
    });

    // alert('You continue!');

  };

  render() {
    const disabledInfo = {
    ...this.props.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if(this.props.ingredients){
      orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice} cancelOrder={this.purchaseCancelHandler} continueOrder={this.purchaseContinueHandler}/>;
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls
        disabled={disabledInfo}
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.props.onIngredientRemoved}
        price={this.props.totalPrice}
        purchaseable={this.isPurchaseable()}
        ordered={this.purchaseHandler}
        />
      </Aux>
      );
    }

    if(this.state.loading){
      orderSummary = <Spinner/>;
    }


    return (
    <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
    );
  }

}


const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType}),
    onIngredientRemoved: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));