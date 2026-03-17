const jwt = require("jsonwebtoken");

var admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8",
);

const serviceAccount = JSON.parse(decoded);
// var serviceAccount = require("../firebaseSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthoraized access" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    // console.log("Decoded Token:", decoded);
    next();
  });
};

// const logger = (req, res, next) => {
//   console.log("insite The Logger middleware");
//   next();
// };

const verifyFirebaseToken = async (req, res, next) => {
  const authHeaders = req?.headers?.authorization;
  //   console.log(authHeaders);

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).send({ message: "unauthorize access" });
  }
  const token = authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "unauthorize access" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // console.log("firebase token decoded", decoded);
    req.decoded = decoded;

    // console.log("firebase user info verify", decoded);
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorize access" });
  }
};

const verifyEmailToken = (req, res, next) => {
  if (req.query.email !== req.decoded.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = {
  verifyToken,
  // logger,
  verifyFirebaseToken,
  verifyEmailToken,
};
