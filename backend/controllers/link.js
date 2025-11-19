const Link = require('../models/LinkModel');
const Counter = require('../models/Counter');
const createLinkSchema=require('../utils/validateSchema');
const encodeBase62=require('../utils/codeGenerater');
module.exports.createLink=async (req, res) => {
  try {
    const { error, value } = createLinkSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message.replace(/"/g, '') });
    }

    let { url, code } = value;


    if (code) {
      const existing = await Link.findOne({ shortCode: code });
      if (existing) {
        return res.status(409).json({ error: "Code already exists" });
      }
      const newLink = await Link.create({ originalUrl: url, shortCode: code });
      return res.status(201).json(newLink);
    }

    const counter = await Counter.findByIdAndUpdate(
      { _id: 'link_count' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (counter.seq < 57000000000) {
        counter.seq = 57000000000;
        await counter.save();
    }

    const uniqueCode = encodeBase62(counter.seq);

    const newLink = await Link.create({
      originalUrl: url,
      shortCode: uniqueCode
    });

    res.status(201).json(newLink);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports.getAllLink=async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports.getLink=async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.code });
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports.deleteLink=async (req, res) => {
  try {
    const link = await Link.findOneAndDelete({ shortCode: req.params.code });
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.status(200).json({ message: "Link deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}