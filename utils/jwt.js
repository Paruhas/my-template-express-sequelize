const jwt = require("jsonwebtoken");

async function JWT_decode(token) {
  const result = { isError: null, data: {}, error: null };

  try {
    const decode = jwt.decode(token);
    console.log({ JWT_decode_decode: decode });

    result.isError = false;
    result.data = decode;
  } catch (error) {
    result.isError = true;
    result.error = error.message;
  }

  return result;
}

function JWT_sign(payload) {
  const result = { isError: null, data: {}, error: null };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    result.isError = false;
    result.data = token;
  } catch (error) {
    result.isError = true;
    result.error = error.message;
  }

  return result;
}

function JWT_verify(token) {
  const result = { isError: null, data: {}, error: null };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    result.isError = false;
    result.data = payload;
  } catch (error) {
    result.isError = true;
    result.error = error.message;
  }

  return result;
}

module.exports = { JWT_decode, JWT_sign, JWT_verify };
