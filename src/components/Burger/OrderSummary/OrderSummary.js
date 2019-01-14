import React, {Component} from 'react';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

  componentWillUpdate(){
    console.log('[OrderSummary] will update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingredientKey => {
      return (
      <li key={ingredientKey}>
        <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
      </li>
      );
    });

    return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.continueOrder}>CONTINUE</Button>
    </React.Fragment>
    );
  }

}

export default OrderSummary;
