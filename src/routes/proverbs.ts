import * as express from "express";
import Proverb from "../models/Proverb";

const router = express.Router();

router.get("/", async (req, res) => {
  const proverbs = await Proverb.find({ lang: req.query.lang });
  res.json(proverbs);
});

router.get("/random", async (req, res) => {
  const rand = await Proverb.aggregate([
    { $match: { lang: req.query.lang } },
    { $sample: { size: 1 } }
  ]);
  res.json(rand);
});

router.get("/:id", async (req, res) => {
  const proverb = await Proverb.findById(req.params.id);
  res.json([proverb]);
});

export default router;
