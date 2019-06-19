import * as express from "express";
import Language from "../models/Language";

const router = express.Router();

router.get("/", async (req, res) => {
  const languages = await Language.find({});
  res.json(languages);
});

export default router;
