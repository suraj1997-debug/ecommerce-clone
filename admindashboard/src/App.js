import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './containers/Dashboard';
import SignupContainer from './containers/signup';
import LoginContainer from './containers/login';
import {  Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {isUserLoggedIn,getinitialData} from './redux/store'
import Category from './containers/category';
import Product from './containers/products';
import PageContainer from './containers/page';
import Order from './containers/orders/orders';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);


  //ComponentDidUpdate
  useEffect(()=>{
    if(!auth.authenticate){
    dispatch(isUserLoggedIn());
    }

     if(auth.authenticate){
       dispatch(getinitialData());
     }

},[auth.authenticate]);


  return (
    <>
      <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute  path="/Categories" component={Category} />
            <PrivateRoute  path="/page" component={PageContainer} />
            <PrivateRoute  path="/Products" component={Product} />
            <PrivateRoute  path="/Orders" component={Order} />

            <Route path="/signUp" component={SignupContainer} />
            <Route path="/signIn" component={LoginContainer} />
          </Switch>

      </div>
      </>
  );
}

export default App;
