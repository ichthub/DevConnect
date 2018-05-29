const express = require('express');
const router = express.Router();

// this is equal to app.get()
/*
    @Route  /api/profile/test
    @Desc   Test profile route
    @Access public
*/
router.get('/test', (req, res) => res.json({ res: 'from profiles' }));
module.exports = router;
