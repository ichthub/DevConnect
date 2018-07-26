import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextareaField';
import { addComment } from '../../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Comment...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChangeHandler}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
