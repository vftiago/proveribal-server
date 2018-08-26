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
                const photoURL = profile.photos[0].value;
                const imageURL = photoURL.substring(0, photoURL.indexOf("?"));

                const user =
                    (await User.findOne({
                        googleID: profile.id
                    })) ||
                    (await new User({
                        googleID: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        imageURL
                    }).save());

                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log("serialize", user);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        console.log("deserialize", user);
        done(null, user);
    });
};
