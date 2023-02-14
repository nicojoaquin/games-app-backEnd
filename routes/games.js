const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getGames,
  createGames,
  updateGames,
  deleteGames,
} = require("../controllers/games");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.use(validateJWT);

router.get("/", getGames);

router.post(
  "/",
  [
    check("id", "Id is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("thumbnail", "Image is required").not().isEmpty(),
    validateFields,
  ],
  createGames
);

router.put("/:id", updateGames);

router.delete("/:id", deleteGames);

module.exports = router;
