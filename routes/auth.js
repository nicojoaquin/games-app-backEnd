/* Routas de usuarios / Auth
   host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, userLogin, revToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Email is required").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  userLogin
);

router.get("/renew", validateJWT, revToken);

module.exports = router;
