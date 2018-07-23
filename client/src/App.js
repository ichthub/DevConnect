import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './Store';

import EditProfile from './component/editProfile/EditProfile';
import setAuthToken from './utils/setAuth';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Dashboard from './component/dashboard/Dashboard';
import CreateProfile from './component/createProfile/CreateProfile';
import AddExperience from './component/addExperience/AddExperience';
import AddEducation from './component/addEducation/AddEducation';
import PrivateRoute from './component/common/PrivateRoute';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import NotFound from './component/notFound/NotFound';
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
    store.dispatch(clearCurrentProfile());
    // reirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  state = {
    //
  };
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
