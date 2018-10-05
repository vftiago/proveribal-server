import * as express from "express";
import { config } from "dotenv";
import User from "../models/User";
import { OAuth2Client } from "google-auth-library";

config(); // retrieve .env file

const env = process.env;

const { CLIENT_ID } = env;

const router = express.Router();

router.post("/user", async (req, res) => {
    const token = req.body.data;
    try {
        const tokenPayload = await verify(token).catch(console.error);
        if (!tokenPayload) {
            throw new Error("client.verifyIdToken returned void");
        }

        console.log(tokenPayload);

        const user =
            (await User.findOne({
                googleID: tokenPayload["sub"]
            })) ||
            (await new User({
                googleID: tokenPayload["sub"],
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

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    return ticket.getPayload();
}
