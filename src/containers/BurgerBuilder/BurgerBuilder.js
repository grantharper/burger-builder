import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false
  };

  updatedPurchaseState (currentIngredients) {
    const ingredients = {...currentIngredients};
    const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);
    this.setState({purchaseable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
    this.updatedPurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount < 1) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
    this.updatedPurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
    ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
    <Aux>
      <Burger ingredients={this.state.ingredients}/>
      <BuildControls
      disabled={disabledInfo}
      ingredientAdded={this.addIngredientHandler}
      ingredientRemoved={this.removeIngredientHandler}
      price={this.state.totalPrice}
      purchaseable={!this.state.purchaseable}
      />
    </Aux>
    );
  }

}

export default BurgerBuilder;