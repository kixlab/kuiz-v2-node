var express = require('express');
var router = express.Router()

var loadStudents = require('../middlewares/admin/loadUserInfoMiddleware')

router.get('/load/user', loadStudents)

module.exports = router