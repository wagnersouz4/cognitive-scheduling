const express = require('express');
const router = express.Router();

const webhook = require('./webhook');

router.get('/webhook', webhook.get);
router.post('/webhook', webhook.read);

module.exports = router;
