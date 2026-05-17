const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient')

const {
    getAssets
} = require('../controllers/assetController');

// Assets routes
router.get('/', getAssets)


module.exports = router;