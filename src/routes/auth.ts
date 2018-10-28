import * as express from "express";
import User from "../models/User";
import verifyIdToken from "../utils/verifyIdToken";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/user", async (req, res) => {
    const idToken = req.body.data;

    const tokenPayload = await verifyIdToken(idToken);

    const userId = parseInt(tokenPayload["sub"], 10);

    if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid ObjectId generated");
    }

    try {
        const user =
            (await User.findOne({ _id: userId })) ||
            (await new User({
                _id: userId,
                firstName: tokenPayload["given_name"],
                lastName: tokenPayload["family_name"],
                username: tokenPayload["email"],
                email: tokenPayload["email"],
                imageURL: tokenPayload["picture"]
            }).save());

        res.json(user);
    } catch (e) {
        throw new Error(e);
    }
});

export default router;
