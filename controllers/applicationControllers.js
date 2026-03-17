const applicationService = require("../service/applicationService");

// const getApplications = async (req, res) => {
//   try {
//     const email = req.query.email;
//     const result = await applicationService.getApplications(email);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ message: "failed to fetch applications" });
//   }
// };

const postApplication = async (req, res) => {
  try {
    const body = req.body;
    const result = await applicationService.postApplication(body);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to submit application" });
  }
};

const getApplicationsByApplicant = async (req, res) => {
  // console.log("inside application api", req.cookies);

  try {
    const query = req.query.email;
    const result = await applicationService.getApplicationsByApplicant(query);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch applicant applications" });
  }
};

const getApplicationsByJobId = async (req, res) => {
  try {
    const query = req.params.jobId;
    const result = await applicationService.getApplicationsByJobId(query);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch  applications" });
  }
};
const patchApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await applicationService.patchApplication(id, status);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Patch  applications" });
  }
};

module.exports = {
  // getApplications,
  postApplication,
  getApplicationsByApplicant,
  getApplicationsByJobId,
  patchApplication,
};
