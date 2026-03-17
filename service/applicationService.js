const connectToDB = require("../utils/db");
const { ObjectId } = require("mongodb");

const postApplication = async (application) => {
  const db = await connectToDB();
  const applicationCollections = db.collection("application-collection");
  return await applicationCollections.insertOne(application);
};

// const getApplications = async (email) => {
//   const db = await connectToDB();
//   const query = { applicant: email };

//   const applicationCollections = db.collection("application-collection");
//   return await applicationCollections.find(query).toArray();
// };

const getApplicationsByApplicant = async (email) => {
  const db = await connectToDB();
  const applicationCollections = db.collection("application-collection");
  const jobCollection = db.collection("job-collection");
  const query = { applicant: email };
  const applications = await applicationCollections.find(query).toArray();

  // 2️⃣ loop দিয়ে job info attach করা
  for (const application of applications) {
    if (application.jobId) {
      const id = application.jobId;
      const jobQuery = { _id: new ObjectId(id) };
      const job = await jobCollection.findOne(jobQuery);

      application.title = job.title;
      application.company = job.company;
      application.company_logo = job.company_logo;
      application.category = job.category;
    }
  }

  return applications;
};

const getApplicationsByJobId = async (jobId) => {
  const db = await connectToDB();
  const applicationCollections = db.collection("application-collection");
  const job_Id = { jobId: jobId };
  return await applicationCollections.find(job_Id).toArray();
};

const patchApplication = async (id, status) => {
  const db = await connectToDB();
  const applicationCollections = db.collection("application-collection");
  const query = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { status: status },
  };
  const result = await applicationCollections.updateOne(query, updateDoc);
  return result;
};
module.exports = {
  postApplication,
  // getApplications,
  getApplicationsByApplicant,
  getApplicationsByJobId,
  patchApplication,
};
