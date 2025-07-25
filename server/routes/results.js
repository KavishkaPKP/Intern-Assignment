const express = require('express');
const router = express.Router();
const { submitResult, getResults } = require('../controllers/resultController');

router.post('/submit', submitResult); // ✅ this MUST exist
router.get('/:userId', getResults);

module.exports = router;