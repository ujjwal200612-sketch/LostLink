const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      throw error;
    }

    res.json({
      status: 'ok',
      service: 'LostLink API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        connected: true,
        provider: 'Supabase',
      },
      uptimeSeconds: Math.floor(process.uptime()),
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'LostLink API',
      database: {
        status: 'disconnected',
        connected: false,
        provider: 'Supabase',
      },
      message: error.message,
    });
  }
});

module.exports = router;