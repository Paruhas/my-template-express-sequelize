const bcrypt = require("bcryptjs");

async function BCRYPT_hash(data) {
  const result = { isError: null, data: {}, error: null };

  try {
    const hash = await bcrypt.hash(data, +process.env.BCRYPT_SALT);

    result.isError = false;
    result.data = hash;
  } catch (error) {
    result.isError = true;
    result.error = error.message;
  }

  return result;
}

async function BCRYPT_compare(data, hash) {
  const result = { isError: null, data: {}, error: null };

  try {
    const matched = await bcrypt.compare(data, hash);

    result.isError = false;
    result.data = matched;
  } catch (error) {
    result.isError = true;
    result.error = error.message;
  }

  return result;
}

module.exports = { BCRYPT_hash, BCRYPT_compare };
