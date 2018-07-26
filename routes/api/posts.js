const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/post');
const Profile = require('../../models/Profile');

const ValidatePosts = require('../../validations/post');

const router = express.Router();

/*
    @Route  /api/posts
    @Desc   Create posts
    @Access private
*/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = ValidatePosts(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
      newPost.save().then(post => {
        res.json(post);
      });
    }
  }
);

/*
    @Route  GET /api/posts
    @Desc   get posts
    @Access public
*/
router.get('/', (req, res) => {
  // sort posts by date
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ noPosts: 'No posts found' }));
});
/*
    @Route  GET /api/post/:id
    @Desc   get post by id
    @Access public
*/
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() =>
      res.status(404).json({ noPost: 'No post found with that ID' })
    );
});

/*
    @Route  DELETE /api/post/:id
    @Desc   delete post by id
    @Access private
*/
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // check for post owners
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: 'User not authorized' });
          }
          // delete

          return post
            .remove()
            .then(() => res.json({ feedback: 'Deleted successfully' }))
            .catch(() =>
              res
                .status(404)
                .json({ failedToDelete: 'failed to delete post 1' })
            );
        })
        .catch(() => res.status(404).json({ postNotFound: 'post not found' }));
    });
  }
);

/*
    @Route  POST /api/post/like/:id
    @Desc   like post
    @Access private
*/
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // check if the user has already liked the post
          if (
            post.like.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.status(400).json({ alreadyLiked: 'post already liked' });
          }
          // add to the post likes
          post.like.unshift({ user: req.user.id });

          return post.save().then(pst => res.json(pst));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: 'post not found', er: err })
        );
    });
  }
);

/*
    @Route  POST /api/post/like/:id
    @Desc   unlike post
    @Access private
*/
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // check if the user had liked the post
          if (
            post.like.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: 'You have not liked this post yet' });
          }
          // Get the remove index
          const removeIndex = post.like
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of the array
          post.like.splice(removeIndex, 1);

          return post.save().then(pst => res.json(pst));
        })
        .catch(err =>
          res.status(404).json({ postNotFound: 'post not found', er: err })
        );
    });
  }
);

/*
    @Route  POST /api/post/comment/:id
    @Desc   add comment to a post
    @Access private
*/
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // We only need to verifity the text field so we can reuse the post validation
    const { isValid, errors } = ValidatePosts(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        // create a comment
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };
        // add a post
        post.comment.unshift(newComment);
        // save post
        post.save().then(pst => res.json(pst));
      })
      .catch(err =>
        res.status(404).json({ postNotFound: 'post not found', er: err })
      );
  }
);

/*
    @Route  DELET /api/post/comment/:id/:comment
    @Desc   add comment to a post
    @Access private
*/
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // check if comment exists
        /* eslint no-underscore-dangle: "error" */
        if (
          post.comment.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ commentNoExist: 'No comment found' });
        }
        // get the index to remove
        const removeIndex = post.comment
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        /* eslint no-underscore-dangle: 0 */
        // remove comment by its index
        post.comment.splice(removeIndex, 1);

        // save post

        return post.save().then(pst => res.json(pst));
      })
      .catch(err =>
        res.status(404).json({ postNotFound: 'post not found', er: err })
      );
  }
);

module.exports = router;
