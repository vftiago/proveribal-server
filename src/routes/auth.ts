import * as express from "express";
import User from "../models/User";
import Language from "../models/Language";
import verifyIdToken from "../utils/verifyIdToken";
import { ObjectId } from "mongodb";
import appDefaults from "../appDefaults";

const router = express.Router();

router.post("/user", async (req, res) => {
    const idToken = req.body.data;

    const tokenPayload = await verifyIdToken(idToken);

    const userId = parseInt(tokenPayload["sub"], 10);

    if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid ObjectId generated");
    }

    try {
        let user;

        user = await User.findOne({ _id: userId }).populate({
            path: "settings.selectedLanguages",
            model: "language"
        });

        if (!user) {
            const newUser = {
                _id: userId,
                firstName: tokenPayload["given_name"],
                lastName: tokenPayload["family_name"],
                username: tokenPayload["email"],
                email: tokenPayload["email"],
                imageURL: tokenPayload["picture"],
                settings: {
                    selectedLanguages: []
                },
                favorites: []
            };

            const defaultLanguage = await Language.findOne({
                _id: appDefaults.userSettings.selectedLanguageId
            });

            newUser.settings.selectedLanguages.push(defaultLanguage);

            user = await new User(newUser).save();
        }

        res.json(user);
    } catch (e) {
        throw new Error(e);
    }
});

export default router;
