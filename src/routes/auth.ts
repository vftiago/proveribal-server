import * as express from "express";
import { config } from "dotenv";
import User from "../models/User";

config(); // retrieve .env file

const env = process.env;

const router = express.Router();

router.post("/user", async (req, res) => {
    console.log(req.body);
    const user = await User.findById(req.params.id);
    res.json(user);
});

export default router;
