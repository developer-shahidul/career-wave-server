const jobService = require("../service/JobService");

const getJobs = async (req, res) => {
  try {
    const result = await jobService.getJobs();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "failed to fetch users" });
  }
};

const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await jobService.getJobById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "failed to fetch jobs Id" });
  }
};

const createJobPost = async (req, res) => {
  try {
    const body = req.body;
    const result = await jobService.createJobPost(body);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to create job post" });
  }
};
// const getMyJobs = async (req, res) => {
//   try {
//     const email = req.query.email;
//     const result = await jobService.getMyJobs(email);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ message: "failed to fetch jobs" });
//   }
// };

const getJobsApplications = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await jobService.getJobsApplications(email);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch applicant applications" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJobPost,
  // getMyJobs,
  getJobsApplications,
};
