import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount(){
    axios.get('/orders.json')
    .then(response => {
      console.log(response);
      this.setState({orders: response.data, loading: false});
    }).catch(error => {
      console.log(error);
      this.setState({loading: false});
    });
  }

  render() {

    let orderInfo = [];

    if(!this.state.loading){
      for(let order in this.state.orders){
        orderInfo.push(<Order key={order}
                              ingredients={this.state.orders[order].ingredients}
                              totalPrice={this.state.orders[order].totalPrice}/>)
      }
    }

    return (
    <div>
      {orderInfo}
    </div>
    );
  }
}

export default withErrorHandler(Orders, axios);