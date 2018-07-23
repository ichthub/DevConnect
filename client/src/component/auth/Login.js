import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFields';

class Login extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }

    return null;
  }
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmitHandler(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Bricoly account
              </p>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={this.onChangeHandler}
                  error={errors.email}
                  value={this.state.email}
                  isDisabled={false}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChangeHandler}
                  error={errors.password}
                  value={this.state.password}
                  isDisabled={false}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
