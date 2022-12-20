const { client } = require("../database");
const db = client.db("bizWork");

// Get Search Based JobsF
function getJobs(req, res, next) {
  // const id = req?.user;
  const { jobTitle } = req.body;
  // Checking Required fields is received or not
  if (!jobTitle) {
    return res.status(400).send("All Fields are Required");
  }

  db.collection("jobs")
    .find({ title: { $regex: jobTitle, $options: "i" } })
    .toArray(function (err, items) {
      res.send(items);
    });
}

module.exports = getJobs;
