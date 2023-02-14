const jwt = require("jsonwebtoken");

const genJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.warn(err);
          reject("Error generating token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  genJWT,
};
