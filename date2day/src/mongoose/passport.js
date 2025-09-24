import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bycrypt from "bcryptjs";
import User from "./models/user.js";

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user)
                    return done(null, false, { message: "No User Found" });

                if (!user.passwordHash) {
                    return done(null, false, {
                        message: "Use Google Login Instead",
                    });
                }

                const isMatch = await bycrypt.compare(
                    password,
                    user.passwordHash
                );

                if (!isMatch)
                    return done(null, false, { message: "Wrong Password" });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await User.findOne({ email });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id.toString();
                        await user.save();
                    }
                } else {
                    user = await User.create({
                        googleId: profile.id,
                        email,
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
