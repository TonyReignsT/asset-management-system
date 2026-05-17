const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

router.get('/test-db', async (req, res) => {
  try {
    // simple query (table must exist)
    const { data, error } = await supabase
      .from('users')   // this table should exists in Supabase
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      message: 'Supabase connected successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;