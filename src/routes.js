const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const electronicsController = require('./controller/electronicsController');
const searchController = require('./controller/searchController');

router.use('/', homeController);
router.use('/search', searchController);
router.use('/auth', authController);
router.use('/electronics', electronicsController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;
