const { Router } = require('express');
const Link = require('../models/LinkModel');

const router = Router();


router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.code });
    
    if (!link) {
      return res.status(404).send("404 - Link not found");
    }

    link.clicks += 1;
    link.lastClickedAt = new Date();
    link.save().catch(err => console.error("Stats update failed", err));

    res.redirect(302, link.originalUrl);
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;