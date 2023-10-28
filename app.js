const express=require('express');
const app_server=express();
const cors = require('cors');
app_server.use(cors({ origin: '*' }));
app_server .use(express.json());
app_server.use("/students",  require("./controllers/students.controller"));
app_server.use("/mentors",  require("./controllers/mentors.controller"));

module.exports=app_server;