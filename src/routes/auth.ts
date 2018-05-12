import * as express from "express";
import * as passport from "passport";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
