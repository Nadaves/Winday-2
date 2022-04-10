const router = require("express").Router();
const Data = require("../models/Data");

router.get("/get", async (req, res) => {
  try {
    const Stats = await Data.find();
    res.status(200).json(Stats);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
