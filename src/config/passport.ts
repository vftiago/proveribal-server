import * as googlePassport from "passport-google-oauth20";
import { config } from "dotenv";
import User from "../models/User";

config();
const env = process.env;

const GooglePassportStrategy = googlePassport.Strategy;

export default passport => {
    passport.use(
        new GooglePassportStrategy(
            {
                clientID: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
                proxy: true
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(profile);
                const photoURL = profile.photos[0].value;
                const imageURL = photoURL.substring(0, photoURL.indexOf("?"));
                const newUser = {
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    imageURL
                };

                const user =
                    (await User.findOne({
                        googleID: profile.id
                    })) || (await new User(newUser).save());

                done(null, user);
            }
        )
    );
};
