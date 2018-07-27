import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './Store';
import PrivateRoute from './component/common/PrivateRoute';

// USER
import setAuthToken from './utils/setAuth';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
// Layout
import './App.css';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import Dashboard from './component/dashboard/Dashboard';
import NotFound from './component/notFound/NotFound';
// Profile
import CreateProfile from './component/createProfile/CreateProfile';
import EditProfile from './component/editProfile/EditProfile';
import AddExperience from './component/addExperience/AddExperience';
import AddEducation from './component/addEducation/AddEducation';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profiles/profile/Profile';
// Post
import Posts from './component/posts/Posts';
import Post from './component/posts/post/Post';

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
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                  <PrivateRoute exact path="/feed" component={Posts} />
                  <PrivateRoute exact path="/post/:id" component={Post} />
                </Switch>
                <Route path="/not-found" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
