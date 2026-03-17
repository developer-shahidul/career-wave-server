const { ObjectId } = require("mongodb");
const connectToDB = require("../utils/db");

const getJobs = async () => {
  const db = await connectToDB();
  const jobCollection = db.collection("job-collection");
  return await jobCollection.find({}).toArray();
};
const getJobById = async (id) => {
  const db = await connectToDB();
  const jobCollection = db.collection("job-collection");
  const query = { _id: new ObjectId(id) };
  return await jobCollection.findOne(query);
};

const createJobPost = async (createJob) => {
  const db = await connectToDB();
  const jobCollection = db.collection("job-collection");
  return await jobCollection.insertOne(createJob);
};

// const getMyJobs = async (email) => {
//   const db = await connectToDB();
//   const jobCollection = db.collection("job-collection");
//   const query = { hr_email: email };
//   return jobCollection.find(query).toArray();
// };

const getJobsApplications = async (email) => {
  const db = await connectToDB();
  const applicationCollections = db.collection("application-collection");
  const jobCollection = db.collection("job-collection");

  const query = { hr_email: email };
  const jobs = await jobCollection.find(query).toArray();

  for (const job of jobs) {
    const applicationQuery = { jobId: job._id.toString() };
    const Application_count =
      await applicationCollections.countDocuments(applicationQuery);
    job.Application_count = Application_count;
  }
  return jobs;
};

module.exports = {
  getJobs,
  getJobById,
  createJobPost,
  // getMyJobs,
  getJobsApplications,
};
