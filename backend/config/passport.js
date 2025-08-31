import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import TwitterStrategy from "@superfaceai/passport-twitter-oauth2";
import { UserModel } from "../models/authModel.js";


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const requestedRole = req.query.state === "doctor" ? "doctor" : "user";

        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: requestedRole,
            userName: profile.emails[0].value.split("@")[0],
          });
        } else if (user.role !== requestedRole) {
          user.role = requestedRole;
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  "twitter-oauth2",
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "/auth/twitter/callback",
      scope: ["tweet.read", "users.read", "offline.access", "email"],
      state: true,            
      pkce: true,            
      clientType: "confidential", 
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const requestedRole = req.query.state === "doctor" ? "doctor" : "user";

        let user = await UserModel.findOne({ twitterId: profile.id });
        if (!user) {
          user = await UserModel.create({
            twitterId: profile.id,
            userName:
              profile.username || profile.displayName.toLowerCase().replace(/\s+/g, ""),
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            role: requestedRole,
          });
        } else if (user.role !== requestedRole) {
          user.role = requestedRole;
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
