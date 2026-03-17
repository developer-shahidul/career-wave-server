const express = require("express");
const {
  getJobs,
  getJobById,
  createJobPost,
  getMyJobs,
  getJobsApplications,
} = require("../controllers/JobControllers");
const {
  verifyFirebaseToken,
  verifyEmailToken,
} = require("../middleWares/auth");

// Router দিয়ে আমরা routes ভাগ করে আলাদা file এ রাখতে পারি।
const router = express.Router();

router.get("/", getJobs);
// router.get("/my-jobs", getMyJobs);
router.get(
  "/applications",
  verifyFirebaseToken,
  verifyEmailToken,
  getJobsApplications,
);
router.get("/:id", getJobById);
router.post("/", createJobPost);

module.exports = router;
