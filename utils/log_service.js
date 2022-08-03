const fs = require("fs");
const { dateFormat_TH } = require("./date_service.js");
const log_path = "./logs";

const createLogFolder = async () => {
  console.log("Try create logs folder...");

  let res = false;

  try {
    fs.mkdirSync(log_path);
    fs.writeFileSync(log_path + "/.gitkeep", "");

    res = true;
  } catch (error) {}

  return res;
};

const checkLogFolder = async () => {
  try {
    const file_exists = fs.existsSync(log_path);

    switch (file_exists) {
      case false:
        const res = await createLogFolder();

        console.log(
          res
            ? "Create logs folder successfully."
            : "Fail to create logs folder."
        );
        break;

      default:
        break;
    }

    return;
  } catch (error) {}
};

const createLogFile = async () => {
  const { date_isoString, date_dateOnly, date_timeOnly } = dateFormat_TH();

  let log = { error: [], info: [] };

  try {
    fs.writeFileSync(`./logs/log_${date_dateOnly}.json`, JSON.stringify(log));
  } catch (error) {
    writeLogFile(error);
  }

  return log;
};

const readLogFile = async () => {
  const { date_isoString, date_dateOnly, date_timeOnly } = dateFormat_TH();

  try {
    const log_json = fs.readFileSync(
      `./logs/log_${date_dateOnly}.json`,
      "utf8"
    );

    log = await JSON.parse(log_json);
  } catch (error) {
    log = await createLogFile();
  }

  return log;
};

const writeLogFile = async (info = null, error = null) => {
  const { date_isoString, date_dateOnly, date_timeOnly } = dateFormat_TH();

  const log = await readLogFile();
  let log_updated = false;

  if (info !== null) {
    info.time_th = date_isoString;
    log.info.push(info);

    log_updated = true;
  }
  if (error !== null) {
    log.error.push({
      time_th: date_isoString,
      error_stack: error.stack,
      error_message: error.message,
    });

    log_updated = true;
  }

  if (log_updated === true) {
    fs.writeFileSync(`./logs/log_${date_dateOnly}.json`, JSON.stringify(log));
  }

  return;
};

module.exports = { checkLogFolder, readLogFile, writeLogFile };
