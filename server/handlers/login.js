const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { client } = require("../database");
const db = client.db("bizWork");

function login(req, res) {
  const { email, password } = req.body;

  //   Checking User Already Exists Or not?
  db.collection("users")
    .find({ email })
    .toArray(function (err, items) {
      // If exist then return this response
      if (items.length > 0) {
        // Getting the User
        const user = items[0];
          // Comparing Password
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              // Password Matched
              if (isMatch) {
                // Creating JWT token
                //   Creating JWT token
                let accessToken = jwt.sign(
                  {
                    id: user._id,
                  },
                  "tr~yu`ioijkhbn!;asa:jas'cdfr122-[hnsa",
                  { expiresIn: "1y" }
                );

                // Returning response to the user
                return res.status(200).send({
                  accessToken,
                });
              } else {
                // Wrong Password
                return res.status(401).send("Wrong Password");
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
      } else {
        // If user Does Not exits the return this response
        return res.status(401).send("Email is Wrong");
      }
    });
}

module.exports = login;
