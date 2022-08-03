let ENV = "";

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "./.env.production" });
  ENV = process.env.ENV || "PRODUCTION";
} else {
  require("dotenv").config({ path: "./.env" });
  ENV = process.env.ENV || "LOCAL";
}

const express = require("express");

const { checkLogFolder } = require("./utils/log_service");
const { logger: logMiddleware } = require("./middleware/log.js");
const homeMiddleware = require("./middleware/home.js");
const versionCheck = require("./middleware/version_check.js");
const errorMiddleware = require("./middleware/error.js");
const pathErrorMiddleware = require("./middleware/path_error.js");

const app = express();
const PORT = process.env.PORT || 22001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware);

// Homepage
app.get("/", homeMiddleware);
app.get("/api/version/001", versionCheck);

// Error Path
app.use(errorMiddleware);

// Incorrect Path
app.use("*", pathErrorMiddleware);

app.listen(PORT, async () => {
  await checkLogFolder();

  console.log(
    `
  =====================================

    Server is running on port: ${PORT}
    Currently running mode: ${ENV}

  =====================================
`
  );
});
