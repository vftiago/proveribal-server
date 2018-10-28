import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";

config(); // retrieve .env file

const env = process.env;

const { CLIENT_ID } = env;

const client = new OAuth2Client(CLIENT_ID);

export default async function verifyIdToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID
        });

        const ticketPayload = ticket.getPayload();

        if (!ticketPayload) {
            throw new Error("verifyIdToken returned void");
        }

        return ticketPayload;
    } catch (e) {
        console.error(e);
    }
}
