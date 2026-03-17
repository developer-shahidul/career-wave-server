const express = require("express");
const jobRoutes = require("./jobRoutes");
const applicationRoutes = require("./applicationRoutes");

const router = express.Router();

router.use("/job", jobRoutes);
router.use("/applications", applicationRoutes);

router.get("/", (req, res) => {
  res.send("server site successfully run");
});

module.exports = router;
