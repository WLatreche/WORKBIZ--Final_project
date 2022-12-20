const { client } = require("../database");
const db = client.db("bizWork");

function addJob(req, res) {
  const id = req?.user;

  const { imageUrl, title, description, contactNo } = req.body;
  //   Checking Required fields is received or not
  if (!imageUrl || !title || !description || !contactNo) {
    return res.status(400).send("All Fields are Required");
  }

  db.collection("jobs").insertOne(
    { userId: id, imageUrl, title, description, contactNo },
    function (err, info) {
      const id = info.insertedId;

      if (id) {
        // Returning response to the user
        return res
          .status(200)
          .send({ message: "New Job Added Successful", id });
      }
    }
  );
}

module.exports = addJob;
