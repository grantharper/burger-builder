import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json').then(response => {
      this.setState({ingredients: response.data});
    }).catch(error => {
      this.setState({error: true});
    })
  }

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

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  purchaseContinueHandler = () => {
    console.log(this.props);

    const queryParams = [];
    for(let ingredient in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
    }

    this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryParams.join('&')
    });

    // alert('You continue!');
    // this.setState({
    //   loading: true
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   totalPrice: this.state.totalPrice,
    //   customer: {
    //     name: 'Grant',
    //     address: {
    //       street: 'fake street',
    //       zipCode: '97653',
    //       country: 'Wakanda'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'bike'
    // };
    //
    // //simulate latency with setTimeout
    // setTimeout(() => {axios.post('/orders.json', order)
    // .then(response => {
    //   console.log(response);
    //   this.setState({
    //     purchasing: false,
    //     loading: false
    //   });
    // }).catch(error => {
    //   console.log(error);
    //   this.setState({
    //     purchasing: false,
    //     loading: false
    //   });
    // })}, 2000);

  };

  render() {
    const disabledInfo = {
    ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if(this.state.ingredients){
      orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} cancelOrder={this.purchaseCancelHandler} continueOrder={this.purchaseContinueHandler}/>;
      burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        disabled={disabledInfo}
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        price={this.state.totalPrice}
        purchaseable={!this.state.purchaseable}
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

export default withErrorHandler(BurgerBuilder, axios);