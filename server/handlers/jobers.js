const { client } = require("../database");
const db = client.db("bizWork");

// Get Jober Details
function jobers(req, res, next) {
  const { joberName } = req.body;
  // Checking Required fields is received or not
  if (!joberName) {
    return res.status(400).send("All Fields are Required");
  }

  db.collection("users")
    .find({ firstName: { $regex: joberName, $options: "i" } })
    .toArray(function (err, items) {
      res.send(items);
    });
}

module.exports = jobers;