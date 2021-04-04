
const { Router } = require('express');
const router = Router();
const catCont =require('../controllers/catCont')

router.get('/all',
    catCont.get_cat
)
router.get('/cat/:id',
    catCont.get_catId
)

module.exports = router;