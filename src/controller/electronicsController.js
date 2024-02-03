const router = require('express').Router();
const electronicsService = require('../services/electronicsServices');
const Electronics = require('../models/Electronics');

router.get('/catalog', async (req, res) => {
    const electronics = await electronicsService.getAll();
    res.render('electronics/catalog', { electronics });
});

router.get('/create', (req, res) => {
    if (!req.user) {
        res.redirect('/404');
    }

    res.render('electronics/create');
});

router.post('/create', async (req, res) => {
    try {
        await electronicsService.create({ ...req.body, owner: req.user._id });

        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', { error: getErrorMessage(error), electronicData: req.body });
    }
});

router.get('/details/:electronicId', async (req, res) => {
    if (req.query.buyElectronic) {
        await electronicsService.addToBuyingList(req.params.electronicId, req.user._id);
        res.redirect(`/electronics/details/${req.params.electronicId}`);
    }

    const electronic = await electronicsService.getOne(req.params.electronicId);
    const isBought = electronic.buyingList.includes(req.user?._id);

    res.render('electronics/details', { electronic, isOwner: req.user?._id == electronic.owner, isBought });
});

router.get('/delete/:electronicId', isOwner, async (req, res) => {
    await electronicsService.delete(req.params.electronicId);

    res.redirect('/electronics/catalog');
});

router.get('/edit/:electronicId', isOwner, async (req, res) => {
    const electronic = await electronicsService.getOne(req.params.electronicId);

    res.render('electronics/edit', { electronic });
});

router.post('/edit/:electronicId', isOwner, async (req, res) => {
    try {
        await Electronics.validate(req.body);
        await electronicsService.updateOne(req.params.electronicId, req.body);

        res.redirect('/electronics/details/' + req.params.electronicId);
    } catch (error) {
        const electronic = req.body;
        electronic._id = req.params.electronicId;

        res.render('electronics/edit', { error: getErrorMessage(error), electronic });
    }
});

async function isOwner(req, res, next) {
    const electronicData = await electronicsService.getOne(req.params.electronicId);
    const isOwner = electronicData.owner == req.user?._id;

    if (isOwner) {
        next()
    } else {
        res.render('404');
    }
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
