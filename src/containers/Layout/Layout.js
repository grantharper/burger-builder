import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {withRouter} from 'react-router-dom';

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerOpenedHandler = () => {
    this.setState({showSideDrawer: true});
  };

  render(){
    return (
    <Aux>
      <Toolbar isAuthenticated={this.props.isAuthenticated} openedSideDrawer={this.sideDrawerOpenedHandler}/>
      <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(withRouter(Layout));