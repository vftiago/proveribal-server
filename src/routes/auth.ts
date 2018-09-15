import * as express from "express";
import * as passport from "passport";
import { config } from "dotenv";

config(); // retrieve .env file

const env = process.env;

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: env.ORIGIN,
        session: false
    }),
    (req, res) => {
        console.log(req);
        res.redirect(`${env.ORIGIN}?token=${req.user.token}`);
    }
);

router.get("/verify", (req, res) => {
    if (req.token) {
        console.log("Verify:");
        console.log(req.token);
    } else {
        console.log("Not authenticated.");
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(env.ORIGIN);
});

export default router;
