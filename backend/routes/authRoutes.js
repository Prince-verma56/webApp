import express from "express";
import passport from "../config/passport.js";
import { signinHandler, signupHandler } from "../controllers/auth.js";

const router = express.Router();

router.post('/signup',signupHandler);

router.post('/signin',signinHandler)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "user",
  })
);

router.get(
  "/google/doctor",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "doctor",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get(
  "/twitter",
  passport.authenticate("twitter-oauth2", {
    scope: ["tweet.read", "users.read", "offline.access", "email"],
    state: "user",
  })
);

router.get(
  "/twitter/doctor",
  passport.authenticate("twitter-oauth2", {
    scope: ["tweet.read", "users.read", "offline.access", "email"],
    state: "doctor",
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("twitter-oauth2", { failureRedirect: "/signin", session: false }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);


export default router;
