const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

router.post("/jwt", (req, res) => {
  const { email } = req.body;
  const user = { email };
  const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  /// set in the cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  res.send({ token });
});

module.exports = router;
