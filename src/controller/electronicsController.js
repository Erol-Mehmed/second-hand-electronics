const router = require('express').Router();
const electronicsService = require('../services/electronicsServices');

router.get('/catalog', async (req, res) => {
    const electronics = await electronicsService.getAll();
    res.render('electronics/catalog', { electronics });
});

router.get('/create', (req, res) => {
    res.render('electronics/create');
});

router.post('/create', async (req, res) => {
    try {
        await electronicsService.create({ ...req.body, owner: req.user._id });

        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', { error: getErrorMessage(error), itemData: req.body });
    }
});

router.get('/details/:courseId', async (req, res) => {

});

router.get('/delete/:courseId', isOwner, async (req, res) => {
    await electronicsService.delete(req.params.courseId);

    res.redirect('/electronics/catalog');
});

router.get('/edit/:courseId', isOwner, async (req, res) => {

});

router.post('/edit/:courseId', async (req, res) => {

});

async function isOwner(req, res, next) {
    // const item = await electronicsService.getOne(req.params.courseId);
    // const courseData = course.toObject();
    // const isOwner = courseData.owner == req.user?._id;

    // if (isOwner) {
    //     next()
    // } else {
    //     res.render('404');
    // }
};

function getErrorMessage(error) {
    const errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message;
    }
}

module.exports = router;
