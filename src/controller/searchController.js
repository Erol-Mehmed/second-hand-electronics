const router = require('express').Router();
const electronicsServices = require('../services/electronicsServices');

router.get('/', async (req, res) => {
    console.log('get');
    const electronics = await electronicsServices.getAll();

    res.render('search', { electronics });
});

router.post('/', async (req, res) => {
    console.log('post');
    const searchName = req.body.searchName;
    const searchType = req.body.searchType;
    let electronics = await electronicsServices.getAll();

    if (searchName && searchType) {
        electronics = electronics.filter(e => e.name.toLowerCase().includes(searchName.toLowerCase()) && e.type.toLowerCase().includes(searchType.toLowerCase()));
    } else if (searchName) {
        electronics = electronics.filter(e => e.name.toLowerCase().includes(searchName.toLowerCase()));
    } else if (searchType) {
        electronics = electronics.filter(e => e.type.toLowerCase().includes(searchType.toLowerCase()));
    }

    console.log(req.body);
    
    res.render('search', { electronics, searchName, searchType });
});

module.exports = router;
