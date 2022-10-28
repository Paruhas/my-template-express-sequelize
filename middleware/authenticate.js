// const { findOne: findOneUser } = require("../service/user");
const { CustomError } = require("../utils/errorFormat");
const { JWT_verify } = require("../utils/jwt");

async function basicAuth(req, res, next) {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic ") === -1
    ) {
      throw new CustomError(401, "7880", "Missing Basic Auth.");
    }

    const authToken = req.headers.authorization.split(" ")[1];
    const decodeAuthToken = Buffer.from(authToken, "base64").toString("ascii");
    const [username, password] = decodeAuthToken.split(":");

    if (
      username !== process.env.BASIC_AUTH_U ||
      password !== process.env.BASIC_AUTH_P
    ) {
      throw new CustomError(401, "7880", "Invalid Basic Auth.");
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function loginAuth(req, res, next) {
  try {
    if (!req.headers["x-access-token"]) {
      throw new CustomError(401, "7880", "Missing x-access-token.");
    }

    const token = req.headers["x-access-token"];

    const payload = JWT_verify(token, process.env.JWT_SECRET);
    if (payload.isError === true) {
      // throw new CustomError(400, "7880", `JWT_verify error, ${payload.error}.`);
      throw new CustomError(400, "7880", `สิทธิ์การใช้งาน หมดอายุ.`);
    }

    // const user = await findOneUser({
    //   where: {
    //     uuid: payload.data.uuid,
    //     deleted: false,
    //   },
    // });
    // if (user === undefined) {
    //   throw new CustomError(400, "7880", "database error (findOneUser).");
    // }
    // if (!user) {
    //   //  throw new CustomError(401, "7880", "Invalid x-access-token.");
    //   throw new CustomError(400, "7880", `สิทธิ์การใช้งาน หมดอายุ.`);
    // }

    // req.user = user.get({ plain: true });

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  basicAuth,
  loginAuth,
};
