import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFields';
import SelectListGroup from '../common/SelectList';
import InputGroup from '../common/InputGroup';
import TextAreaGroup from '../common/TextareaField';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors
      };
    }

    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInput: '',
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      phone: '',
      errors: {}
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      phone: this.state.phone
    };
    this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const { errors, displaySocialInput } = this.state;
    let socialInputs = null;
    if (displaySocialInput) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChangeHandler}
            error={errors.twitter}
            icon="fab fa-twitter"
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            value={this.state.facebook}
            _
            onChange={this.onChangeHandler}
            error={errors.facebook}
            icon="fab fa-facebook"
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChangeHandler}
            error={errors.linkedin}
            icon="fab fa-linkedin"
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChangeHandler}
            error={errors.instagram}
            icon="fab fa-instagram"
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChangeHandler}
            error={errors.youtube}
            icon="fab fa-youtube"
          />
        </div>
      );
    }
    const options = [
      { label: '* Select Professional status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Carpenter', value: 'Carpenter' },
      { label: 'Bus Driver', value: 'Bus Driver' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student', value: 'Student' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Auditor', value: 'Auditor' },
      { label: 'Cleaner', value: 'Cleaner' },
      { label: 'Nurse', value: 'Nurse' },
      { label: 'English Teacher', value: 'English Teacher' },
      { label: 'Grocer', value: 'Grocer' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Lets get some information to make your profile stand out
              </p>
              <samll className="d-block pb-2">* = required fields</samll>
              <form onSubmit={this.onSubmitHandler}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChangeHandler}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, compnay name, nickname"
                />
                <SelectListGroup
                  placeholder="* Select professional status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChangeHandler}
                  options={options}
                  error={errors.status}
                  info="Idea about you career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChangeHandler}
                  error={errors.company}
                  info="This may be your company or the one you work for"
                />
                <TextFieldGroup
                  placeholder="Phone number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChangeHandler}
                  error={errors.phone}
                  info="Your phone number"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChangeHandler}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChangeHandler}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChangeHandler}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextAreaGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChangeHandler}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">optional</span>
                </div>
                {socialInputs}
                <input
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createProfile: PropTypes.func.isRequired // eslint-disable-line react/forbid-prop-types
};
const mapStateToProps = ({ profile, errors }) => ({ profile, errors });
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
