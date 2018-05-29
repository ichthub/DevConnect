const express = require('express');
const router = express.Router();

/*
    @Route  /api/users/test
    @Desc   Test users route
    @Access public
*/
router.get('/test', (req, res) => res.json({ res: 'from users' }));
module.exports = router;
