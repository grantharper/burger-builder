import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.loadOrders();
  }

  render() {

    let orderInfo = [];

    if (!this.props.loading) {
      for (let order in this.props.orders) {
        orderInfo.push(<Order key={order}
                              ingredients={this.props.orders[order].ingredients}
                              totalPrice={this.props.orders[order].totalPrice}/>)
      }
    }else{
      orderInfo = <Spinner/>;
    }

    return (
    <div>
      {orderInfo}
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: () => dispatch(actionCreators.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));