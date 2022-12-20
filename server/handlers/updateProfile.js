const mongodb = require("mongodb");
const { client } = require("../database");
const db = client.db("bizWork");

function updateProfile(req, res) {
  //   const id = req?.user;

  const { _id, email, firstName, lastName, imageUrl } = req.body;

  // updating a data by it's ID and new value
  db.collection("users").findOneAndUpdate(
    { _id: new mongodb.ObjectId(_id) },
    { $set: { email, firstName, lastName, imageUrl } },
    function () {
      res.send("Success updated!");
    }
  );
}

module.exports = updateProfile;
