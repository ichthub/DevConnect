import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFields';

class Register extends Component {
  static getDerivedStateFromProps(props, state) {
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
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Bricoly account</p>
              <form noValidate onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={this.onChangeHandler}
                  error={errors.name}
                  value={this.state.name}
                  isDisabled={false}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={this.onChangeHandler}
                  error={errors.email}
                  value={this.state.email}
                  isDisabled={false}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
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
                <TextFieldGroup
                  type="password"
                  placeholder="Confirma Pasword"
                  name="passwordConfirmation"
                  onChange={this.onChangeHandler}
                  error={errors.passwordConfirmation}
                  value={this.state.passwordConfirmation}
                  isDisabled={false}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.object // eslint-disable-line react/forbid-prop-types
};
const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
