require("dotenv").config();

const express = require("express");
const config = require("./config/serverConfig");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;

const indexRouter = require("./routes/index.routes");

config(app);

app.use("/public/img", express.static(path.join(__dirname, "public/img")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`App has been started in port ${PORT}...`);
});
