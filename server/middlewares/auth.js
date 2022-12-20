const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  let authHeader = req.headers.authorization;

  // Checking is authorization token exists or not
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  // Destrcuturing
  const token = authHeader.split(" ")[1];
  try {
    const { id } = jwt.verify(token, "tr~yu`ioijkhbn!;asa:jas'cdfr122-[hnsa");
    req.user = id;
    next();
  } catch (err) {
    return res.status(401).send("Un authorized");
  }
}

module.exports = auth;
