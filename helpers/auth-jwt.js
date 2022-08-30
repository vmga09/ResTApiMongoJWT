const jwt = require("jsonwebtoken");

const getJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puede generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  getJWT,
};
