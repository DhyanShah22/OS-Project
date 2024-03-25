const express = require('express')

const {
    handleRequest
} = require('../Controllers/scanScheduling')

const router  = express.Router()

router.post( '/scan', handleRequest)

module.exports = router;