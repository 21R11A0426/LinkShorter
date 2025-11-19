const { Router } = require('express');
const Link = require('../models/LinkModel');
const Counter = require('../models/Counter');
const createLinkSchema=require('../utils/validateSchema');
const encodeBase62=require('../utils/codeGenerater');
const {createLink,getAllLink,getLink,deleteLink}=require("../controllers/link")
const router = Router();


router.get('/', getAllLink);


router.post('/', createLink);

// GET /:code (Matches /api/links/:code) - Get stats
router.get('/:code', getLink);

// DELETE /:code (Matches /api/links/:code) - Delete link
router.delete('/:code', deleteLink);

module.exports = router;