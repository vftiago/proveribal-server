import Proverb from "./models/Proverb";
import User from "./models/User";
import { config } from "dotenv";
import { connect } from "mongoose";
import * as express from "express";
import * as expressSession from "express-session";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as passport from "passport";
import auth from "./routes/auth";
import googlePassportStrategy from "./config/passport";

config(); // retrieve .env file

const env = process.env;

const counts = {};
const mongoURI = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${
    env.DB_PORT
}/${env.DB_NAME}`;

const app = express();

// app middleware
app.use(
    cors({
        origin: env.ORIGIN
    })
);
app.use(cookieParser());
app.use(
    expressSession({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

googlePassportStrategy(passport);

// use routes
app.use("/auth", auth);

// mongoose connect
connect(
    mongoURI,
    err => {
        if (err) throw err;
        app.emit("ready");
        console.log(
            `Connected to Database at ${new Date().getHours()}:${new Date().getMinutes()}`
        );
    }
);

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
    app.listen(env.APP_PORT, () =>
        console.log(`Listening on port ${env.APP_PORT}`)
    )
);
