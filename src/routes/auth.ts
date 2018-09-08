import * as express from "express";
import * as passport from "passport";
import { config } from "dotenv";

config(); // retrieve .env file

const env = process.env;

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: env.ORIGIN
    }),
    (req, res) => {
        req.login(req.user, () => res.redirect(env.ORIGIN));
    }
);

router.get("/verify", (req, res) => {
    if (req.user) {
        console.log("Verify:");
        console.log(req.user);
    } else {
        console.log("Not authenticated.");
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(env.ORIGIN);
});

export default router;
