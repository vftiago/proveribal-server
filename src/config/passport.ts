import * as oauth from "passport-google-oauth20";
import { config } from "dotenv";

config();
const env = process.env;

const GoogleStrategy = oauth.Strategy;

export default passport => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
                proxy: true
            },
            (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(profile);
            }
        )
    );
};
