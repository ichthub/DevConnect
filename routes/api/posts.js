const express = require('express');

const router = express.Router();
/*
    @Route  /api/posts/test
    @Desc   Test posts route
    @Access public
*/
router.get('/test', (req, res) => res.json({ res: 'from posts' }));
module.exports = router;
