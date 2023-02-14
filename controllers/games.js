const { response } = require("express");
const Game = require("../models/Game");

const getGames = async (req, res = response) => {
  const games = await Game.find().populate("user", "name");

  const uid = req.uid;

  const userGames = games
    .filter((game) => game.user._id.toString() === uid)
    .sort((a, b) => b.date - a.date);

  res.json({
    ok: true,
    userGames,
  });
};

const createGames = async (req, res = response) => {
  const game = new Game(req.body);

  try {
    game.user = req.uid;
    const createdGame = await game.save();

    res.json({
      ok: true,
      game: createdGame,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error",
    });
  }
};

const updateGames = async (req, res = response) => {
  const gameId = req.params.id;
  const uid = req.uid;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        ok: false,
        msg: "The game doesn't exist",
      });
    }

    if (game.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "You cant update this game",
      });
    }

    const newGame = {
      ...req.body,
      user: uid,
    };

    const updatedGame = await Game.findByIdAndUpdate(gameId, newGame, {
      new: true,
    });

    res.json({
      ok: true,
      game: updatedGame,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "error",
    });
  }
};

const deleteGames = async (req, res = response) => {
  const gameId = req.params.id;
  const uid = req.uid;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        ok: false,
        msg: "The game doesn't exist",
      });
    }

    if (game.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "You cant delete this game",
      });
    }

    const deletedGame = await Game.findByIdAndDelete(gameId);

    res.json({
      ok: true,
      game: deletedGame,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "error",
    });
  }
};

module.exports = {
  getGames,
  createGames,
  updateGames,
  deleteGames,
};
