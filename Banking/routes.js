const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/request', controller.requestResource);
router.post('/release', controller.releaseResource);

module.exports = router