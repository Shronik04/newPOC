const { Router } = require('express');
const router = Router();
const authCont = require('../controllers/authCont')
const veri = require('../middleware/tokenVerify')



router.post('/signup',
 
    authCont.signup_post
)
router.put('/edit/:id',
 
    authCont.edit_post
)


router.post('/login',

    authCont.login_post
)
router.get('/admin',

    authCont.admin_get
)
router.get('/userData',

   veri, authCont.user_get 
)
router.get('/all',

    authCont.all
)
router.get('/:id',

    authCont.id
)
router.delete('/:id',

authCont.del
)
router.put("/pass/:id",
 authCont.pass
)

router.post("/reset",
authCont.reset)




module.exports = router;