function MyAuth() {
  const passport = require("passport");
  const Strategy = require("passport-local").Strategy;

  const myAuth = {};

  myAuth.setupPassport = (app) => {
    const myDB = require("../db/MyDB.js");

    // Configure the local strategy for use by Passport.
    //
    // The local strategy requires a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(
      new Strategy(async (username, password, cb) => {
        try {
          const user = await myDB.findByUsername(username);

          if (!user) {
            console.log("User not found");
            return cb(null, false);
          }

          if (user.password !== password) {
            console.log("Wrong password");
            return cb(null, false);
          }

          console.log("Login successfull 💃");
          return cb(null, user);
        } catch (err) {
          console.log("Error finding user", username);
          return cb(err);
        }
      })
    );

    passport.serializeUser(function (user, cb) {
      cb(null, user.username);
    });

    passport.deserializeUser(async (username, cb) => {
      try {
        const user = await myDB.findByUsername(username);
        return cb(null, user);
      } catch (err) {
        console.log("Error deserializing");
        return cb(err);
      }
    });

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(
      require("express-session")({
        secret: "Loves Web John",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
  };

  myAuth.authRouter = () => {
    const express = require("express");
    const router = express.Router();

    router.post(
      "/login",
      passport.authenticate("local", { failureRedirect: "/login" }),
      function (req, res) {
        res.redirect("/");
      }
    );

    router.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/");
    });

    router.get("/getUser", (req, res) => {
      console.log("get user", req.user);
      res.send({ user: req.user ? req.user.username : null });
    });

    return router;
  };

  return myAuth;
}

module.exports = MyAuth();
