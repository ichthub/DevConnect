import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  state = {
    //
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Bricoly</h1>
                  <p className="lead">
                    {' '}
                    Create a provider profile and get more deals with less
                    headache
                  </p>
                  <hr />
                  <Link to="/register" className="btn btn-lg btn-info mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: propTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Landing);
