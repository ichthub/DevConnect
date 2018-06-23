const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// load Profile and User models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validations/profile');
const validateExperienceInput = require('../../validations/experience');
const validateEducationInput = require('../../validations/education');
/*
    @Route GET /api/profile/
    @Desc   get profile info
    @Access protected
*/
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const err = {};
    // user info can be found in req.user
    // console.log(req.user.id);
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .exec((er, profile) => {
        if (!profile) {
          err.noProfile = 'There is no profile for this user';

          return res.status(404).json(err);
        }
        if (er) {
          return res.status(404).json(er);
        }

        return res.json(profile);
      });
  }
);
/*
    @Route GET /api/profile/handle/:handle
    @Desc   get profile by user handle
    @Access public
*/
router.get('/handle/:handle', (req, res) => {
  const err = {};
  // accessing params object
  console.log(req.params);
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name,avatar]'])
    .then(profile => {
      if (!profile) {
        err.noProfile = 'There is no profile for this handle';
        res.status(404).json(err);
      }
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

/*
    @Route GET /api/profile/handle/:user_id
    @Desc   get profile by user id
    @Access public
*/
router.get('/user/:user_id', (req, res) => {
  const err = {};
  // accessing params object
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name,avatar]'])
    .then(profile => {
      if (!profile) {
        err.noProfile = 'There is no profile for this user id';
        res.status(404).json(err);
      }
      res.json(profile);
    })
    .catch(() => {
      err.noProfile = 'There is no profile for this user id';
      res.status(404).json(err);
    });
});

/*
    @Route GET /api/profile/all
    @Desc   get all profiles
    @Access public
*/
router.get('/all', (req, res) => {
  const err = {};
  Profile.find()
    .populate('user', ['name,avatar]'])
    .then(profile => {
      if (!profile) {
        err.noProfile = 'There are no profiles yets';
        res.status(404).json(err);
      }
      res.json(profile);
    })
    .catch(() => {
      err.noProfile = 'There are no profiles yet';
      res.status(404).json(err);
    });
});

/*
    @Route POST /api/profile/
    @Desc   Create or Edit profile
    @Access public
*/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateProfileInput(req.body);
    // check for validity
    if (!isValid) {
      res.status(404).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    const {
      handle,
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills,
      youtube,
      facebook,
      twiter,
      instagram,
      linkedin
    } = req.body;
    if (handle) {
      profileFields.handle = handle;
    }
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (status) {
      profileFields.status = status;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    // Skills - should be splited
    if (skills !== 'undefined') {
      profileFields.skills = skills.split(',');
    }
    // social media
    profileFields.social = {};

    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twiter) {
      profileFields.social.twiter = twiter;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }
    // now after assinging values, we will create or update profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      const err = {};
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => res.json(updatedProfile));
      } else {
        // check if the handle is exist => handle is like @ichthub
        Profile.findOne({ handle: profileFields.handle }).then(prof => {
          if (prof) {
            err.handle = 'That handle is already exist';
            res.status(404).json(err);
          }
        });
        new Profile(profileFields).save().then(savedProfile => {
          res.json(savedProfile);
        });
      }
    });
  }
);

/*
    @Route POST /api/profile/experience
    @Desc   Add experience to profile
    @Access private
*/
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validity
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to the experience array
      profile.experience.unshift(newExp);
      profile.save().then(p => res.json({ p }));
    });
  }
);

/*
    @Route POST /api/profile/education
    @Desc   Add education to profile
    @Access private
*/
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check validity
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        // add to the education array
        profile.education.unshift(newEdu);
        profile.save().then(p => res.json({ p }));
      })
      .catch(err => {
        console.log('ERRRRRRRROUR', err);
      });
  }
);

/*
    @Route DELETE /api/profile/experience/:exp_id
    @Desc   delete experience
    @Access private
*/
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

/*
    @Route DELETE /api/profile/education/:edu_id
    @Desc   delete education
    @Access private
*/
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

/*
    @Route DELETE /api/profile
    @Desc   delete user and profile
    @Access private
*/
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ msg: 'succeeded to remove user' })
        );
      })
      .catch(err => res.json(err));
  }
);
module.exports = router;
