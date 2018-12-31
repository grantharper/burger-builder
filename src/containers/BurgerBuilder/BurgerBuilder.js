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
import * as actionCreators from '../../store/actions/index';


export class BurgerBuilder extends Component {

  state = {
    purchasing: false
  };

  componentDidMount(){
    if(!this.props.ingredients){
      console.log('[BurgerBuilder] init ingredients');
      this.props.onIngredientsInit();
    }
    console.log('[BurgerBuilder] componentDidMount');
  }

  isPurchaseable () {
    const ingredients = {...this.props.ingredients};
    const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);
    return sum > 0
  }

  purchaseHandler = () => {
    //if not authenticated, redirect to auth page first
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    }else {
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
    ...this.props.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

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
        isAuthenticated={this.props.isAuthenticated}
        purchaseable={this.isPurchaseable()}
        ordered={this.purchaseHandler}
        />
      </Aux>
      );
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientType) => dispatch(actionCreators.addIngredient(ingredientType)),
    onIngredientRemoved: (ingredientType) => dispatch(actionCreators.removeIngredient(ingredientType)),
    onIngredientsInit: () => dispatch(actionCreators.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));