const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { client } = require("../database");
const db = client.db("bizWork");

function register(req, res) {
  const { imageUrl, email, firstName, lastName, password } = req.body;

  if (!imageUrl || !email || !firstName || !lastName || !password) {
    return res.send("All fields is required");
  }

  // Checking User Already Exists Or not?
  db.collection("users")
    .find({ email })
    .toArray(function (err, items) {
      // If exist then return this response
      if (items.length > 0) {
        return res.status(409).send("Already Registered");
      } else {
        // If not exists then proceed to the next steps
        // Encrypting the Password
        bcrypt
          .hash(password, 10)
          .then((pass) => {
            //   Inserting Data into the database
            db.collection("users").insertOne(
              { email, firstName, lastName, password: pass, imageUrl },
              function (err, info) {
                const id = info.insertedId;

                //   Creating JWT token
                let accessToken = jwt.sign(
                  {
                    id,
                  },
                  "tr~yu`ioijkhbn!;asa:jas'cdfr122-[hnsa",
                  { expiresIn: "1y" }
                );

                // Returning response to the user
                return res.status(200).send({
                  accessToken,
                });
              }
            );
          })
          .catch((err) => res.status(404).send("Internal Server Error"));
      }
    });
}

module.exports = register;

