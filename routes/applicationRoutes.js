const express = require("express");
const {
  // getApplications,
  postApplication,
  getApplicationsByApplicant,
  getApplicationsByJobId,
  pacthApplication,
} = require("../controllers/applicationControllers");
const {
  // logger,
  verifyToken,
  verifyEmailToken,
} = require("../middleWares/auth");

const router = express.Router();

// router.get("/", getApplications);
router.post("/", postApplication);
router.get(
  "/applicant",
  // logger,
  verifyToken,
  verifyEmailToken,
  getApplicationsByApplicant,
);
router.get("/:jobId", getApplicationsByJobId);
router.patch("/:id", pacthApplication);

module.exports = router;
