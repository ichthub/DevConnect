import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './Store';

import setAuthToken from './utils/setAuth';
import { setCurrentUser, logoutUser } from './actions/authAction';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

import './App.css';

// store the token to avoid losing it after page reload
if (localStorage.jwtToken) {
  // set auth token headers
  setAuthToken(localStorage.jwtToken);
  // decode actions and get user info
  const decode = jwtDecode(localStorage.jwtToken);
  // set user and isAuthenticed
  store.dispatch(setCurrentUser(decode));
  // logout user if token is exp
  const currentTime = Date.now / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logoutUser());

    // reirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
