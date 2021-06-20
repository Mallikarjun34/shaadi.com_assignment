import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'

import  ListPage from'./views/ListPage/ListPage';
import  Login from'./views/Login/Login';
function PrivateRoute ({ children, ...rest }) {
  let localStorageValue = true;
  return (
    <Route {...rest} render={() => {
      return localStorageValue === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/home" name="home" render={props => <ListPage {...props}/>} /> */}
        <PrivateRoute path='/home'>
            <Route exact path="/home" name="home" render={props => <ListPage {...props}/>} /> 
        </PrivateRoute>
        <Route exact path="/" name="login" render={props => <Login {...props}/>} />
        <Route exact path="/login" name="login" render={props => <Login {...props}/>} />
      </Switch>
      </BrowserRouter>
  );
}

export default App;
