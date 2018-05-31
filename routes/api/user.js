const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { SecretKey } = require('../../config/keys');
const User = require('../../models/User'); // load User model
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
/*
    @Route  /api/users/test
    @Desc   Test users route
    @Access public
*/
router.get('/test', (req, res) => res.json({ res: 'from users' }));
/*
    @Route  /api/users/register
    @Desc   register user
    @Access public
*/
router.post('/register', (req, res) => {
  // check the validity of inputs
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email is already exist';

      return res.status(404).json({ errors });
    }
    const avatar = gravatar.url(req.body.email, {
      s: '200', // size
      r: 'pg', // rating
      d: '404' // default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar
    });
    // Details on how bcrypt works
    // https://stackoverflow.com/questions/20394137/yii-cpasswordhelper-hashpassword-and-verifypassword/20399775#20399775
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // console.log(salt);
        // console.log(hash);
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(users => res.json(users))
          .catch(error => console.log(error));
      });
    });
  });
});
/*
    @Route  /api/users/login
    @Desc   login the user and return the JWT
    @Access public
*/
router.post('/login', (req, res) => {
  // check the validity of inputs
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    // user contains the founded record
    if (!user) {
      errors.email = 'User email not found';

      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched so we asign token
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(payload, SecretKey, { expiresIn: 3600 }, (err, token) => {
          if (!err) {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          } else {
            res.json({ error: `Error accured while assigning token ${err}` });
          }
        });
        // res.json({ msg: 'Success' });
      } else {
        errors.password = 'password incorrect';
        res.status(404).json(errors);
      }
    });
  });
});

/*
    @Route  /api/users/current
    @Desc   get current user
    @Access public
*/
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
