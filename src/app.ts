import { config } from "dotenv";
import { connect } from "mongoose";
import * as express from "express";
import * as cors from "cors";
import Proverb from "./models/proverb";
import auth from "./routes/auth";
import * as passport from "passport";
import googlePassport from "./config/passport";

config(); // retrieve .env file
googlePassport(passport);

const env = process.env;
const port = env.APP_PORT || 5000;
const mongoURI = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${
    env.DB_PORT
}/${env.DB_NAME}`;

// load routes

const app = express();
const counts = {};

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.use("/auth", auth);

connect(mongoURI, err => {
    if (err) throw err;
    app.emit("ready");
    console.log(`Connected to Database at ${new Date().getMinutes()}`);
});

app.get("/api/counts", async (req, res) => {
    const count = counts[req.query.lang] || (await Proverb.count(req.query));
    counts[req.query.lang] = count;
    res.json(count);
});

app.get("/api/proverbs", async (req, res) => {
    const proverbs = await Proverb.find({ lang: req.query.lang });
    res.json(proverbs);
});

app.get("/api/proverbs/random", async (req, res) => {
    const rand = await Proverb.aggregate([
        { $match: { lang: req.query.lang } },
        { $sample: { size: 1 } }
    ]);
    res.json(rand);
});

app.get("/api/proverbs/:id", async (req, res) => {
    const proverb = await Proverb.findById(req.params.id);
    res.json([proverb]);
});

app.get("/api/users/login", async (req, res) => {
    const proverb = await Proverb.findById(req.params.id);
    res.json([proverb]);
});

app.get("/api/users/register", async (req, res) => {
    const proverb = await Proverb.findById(req.params.id);
    res.json([proverb]);
});

app.on("ready", () =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
);
