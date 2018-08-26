import * as express from "express";
import * as passport from "passport";

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
        failureRedirect: "http://localhost:3000",
        session: false
    }),
    (req, res) => {
        req.login(req.user, () => res.redirect("http://localhost:3000"));
    }
);

router.get("/verify", (req, res) => {
    console.log(req.user);
    if (req.user) {
        console.log(req.user);
    } else {
        console.log("Not authenticated.");
    }
});

export default router;
