const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

module.exports = router;