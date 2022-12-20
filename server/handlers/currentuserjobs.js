const { client } = require("../database");
const db = client.db("bizWork");

// Get current user jobs
function currentusersjobs(req, res, next) {
  const id = req?.user;
  db.collection("jobs")
    .find({ userId: id })
    .toArray(function (err, items) {
      res.send(items);
    });
}

module.exports = currentusersjobs;
