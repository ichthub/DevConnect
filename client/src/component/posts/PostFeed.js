import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    /* eslint no-underscore-dangle: "error" */
    const { posts } = this.props;

    return posts.map(post => <PostItem key={post._id} post={post} />);
    /* eslint no-underscore-dangle: 0 */
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

export default PostFeed;
