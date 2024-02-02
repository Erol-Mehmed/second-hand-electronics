const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('searchController');

    res.render('search');
});

module.exports = router;
