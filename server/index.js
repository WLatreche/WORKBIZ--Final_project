require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { init } = require("./database");

init();

const addJob = require("./handlers/addJob");
const getJobs = require("./handlers/getJobs");
const register = require("./handlers/register");
const login = require("./handlers/login");
const currentuser = require("./handlers/currentuser");
const updateProfile = require("./handlers/updateProfile");
const currentusersjobs = require("./handlers/currentuserjobs");
const jobers = require("./handlers/jobers");

const auth = require("./middlewares/auth");

const PORT = process.env.PORT || 8000;

express()
  .use(cors())
  .use(express.json())

  .post("/register", register)
  .post("/login", login)
  .get("/currentuser", auth, currentuser)
  .get("/currentusersjobs", auth, currentusersjobs)
  .put("/updateProfile", auth, updateProfile)
  .post("/jobers", auth, jobers)
  .post("/addjob", auth, addJob)
  .post("/getJobs", auth, getJobs)
  .listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
  });
