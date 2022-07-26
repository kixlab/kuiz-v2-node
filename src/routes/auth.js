var express = require('express');
var router = express.Router()

var joinClass = require('../middlewares/auth/joinClassMiddleware')
var register = require('../middlewares/auth/registerMiddleware')

router.post('/class/join', joinClass)
router.post('/register', register)


module.exports = router