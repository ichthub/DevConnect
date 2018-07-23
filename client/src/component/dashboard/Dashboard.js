import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Experience from './Experience';
import Education from './Education';
import ProfileActions from './ProfileActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/spinner/spinner';

class Dashboard extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    }
    // user is logged in but has no profile
    if (profile !== null) {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{' '}
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ margin: '60px' }} />
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
              Delete my Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Add Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propType = {
  profile: PropType.func.isRequired,
  auth: PropType.object.isRequired, // eslint-disable-line react/forbid-prop-types
  getCurrentProfile: PropType.func.isRequired,
  deleteAccount: PropType.func.isRequired
};
const mapSatetToProps = ({ profile, auth }) => ({ profile, auth });

export default connect(
  mapSatetToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
