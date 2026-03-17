const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port is running on http://localhost : ${port}`);
});
