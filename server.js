const express = require('express');
const mongoose = require('mongoose');
// Our Routes
const profileRoute = require('./routes/api/profile');
const userRoute = require('./routes/api/user');
const postsRoute = require('./routes/api/posts');

const app = express();
const db = require('./config/keys').mongoURI;

// solve connection to DB issues
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose
  .connect(db, options)
  .then(() => console.log('connection to DB was established successfully'))
  .catch(err =>
    console.log(`An error was accured while trying to connect to DB ${err}`)
  );
app.get('/', (req, res) => res.send('hello from express app 45'));
/*
A route will match any path that follows its path immediately.
For example: app.use('/api/users', ...) will match “/api/users/test”, “/api/users/test/images”,
“/api/users/test/news”, and so on.
for more: https://expressjs.com/en/api.html#app.use
*/
app.use('/api/users', userRoute);
app.use('/api/post', postsRoute);
app.use('/api/profile', profileRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));
