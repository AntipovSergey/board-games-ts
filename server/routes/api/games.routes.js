const router = require("express").Router();
const { Game } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get("/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findOne({ where: { id: gameId } });
    res.status(200).json(game);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.delete("/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const result = await Game.destroy({ where: { id: gameId } });
    if (result > 0) {
      res.status(200).json({ message: "success" });
      console.log('Succes');
      
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, image, player_count, passed } = req.body;
    const game = await Game.create({
      title,
      description,
      image,
      player_count,
      passed,
    });
    res.status(201).json(game);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.patch("/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const { title, description, image, player_count, passed } = req.body;
    const game = await Game.update(
      {
        title,
        description,
        image,
        player_count,
        passed,
      },
      { where: { id: gameId } }
    );
    res.status(200).json(game);
  } catch ({ message }) {
    res.status(400).json({ meassage });
  }
});

module.exports = router;
