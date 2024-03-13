const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/request', controller.requestResource);
router.post('/release', controller.releaseResource);
router.post('/set-resources', controller.setResources); 

module.exports = router;
