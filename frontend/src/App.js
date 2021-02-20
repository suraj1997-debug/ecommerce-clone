import React, { useEffect } from 'react';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomePage';
import ProductDetailsPage from './containers/ProductDetailsPage';
import ProductListPage from './containers/ProductListPage';
import CartContainer from './containers/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './redux/store';
import CheckoutPage from './containers/Checkout Page';
import OrderDetailsPage from './containers/OrderDetailsPage';
import OrdersPage from './containers/OrdersPage';

function App() {

  const dispatch = useDispatch();

  const auth = useSelector(state=>state.auth);


  useEffect(()=>{

    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart());
  },[auth.authenticate])

  useEffect(()=>{

    dispatch(updateCart());
  },[auth.authenticate])



  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/account/orders" component={OrdersPage} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
        <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
