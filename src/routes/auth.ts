import * as express from "express";
import * as passport from "passport";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

export default router;
