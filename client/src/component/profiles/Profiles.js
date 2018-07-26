import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner/spinner';
import ProfileItem from './ProfileItem';
import SearchInput from '../../component/common/SearchInput';
import { getProfilesByStatus, getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findStatus: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  onChangeHandler(e) {
    this.setState({ findStatus: e.target.value });
  }
  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.findStatus.trim().length > 0) {
      this.props.getProfilesByStatus(this.state.findStatus);
    }
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        /* eslint no-underscore-dangle: "error" */
        <ProfileItem key={profile._id} profile={profile} />
        /* eslint no-underscore-dangle: 0 */
      ));
    } else {
      profileItems = <h4>No profiles found...</h4>;
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Browse Service Providers
              </h1>
              <p className="lead text-center">
                find a provider to get your job done easily
              </p>
              <SearchInput
                onChange={this.onChangeHandler}
                onSubmit={this.onSubmitHandler}
                value={this.state.findStatus}
              />
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  getProfilesByStatus: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  profile: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getProfiles,
    getProfilesByStatus
  }
)(Profiles);
