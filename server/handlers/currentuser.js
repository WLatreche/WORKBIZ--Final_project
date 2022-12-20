const { client } = require("../database");
const mongodb = require("mongodb");
const db = client.db("bizWork");

function currentuser(req, res) {
  const id = req?.user;
  // Checking User Exists or not in the database
  db.collection("users")
    .find({ _id: new mongodb.ObjectId(id) })
    .toArray(function (err, items) {
      // User Exists
      if (items.length > 0) {
        // Destructuring
        const user = items[0];
        // Destructuring
        const { email, firstName, lastName, imageUrl, _id } = user;

        // Sending Response to the client
        res.send({ email, firstName, lastName, imageUrl, _id });
      } else {
        // User Does Not Exist
        return res.status(404).send("User Not Found");
      }
    });
}

module.exports = currentuser;
