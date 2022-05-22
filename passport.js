const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;


const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "87628802578-an1ulf6kjoe52g5kv3tghk4pi0hl4621.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID="87628802578-7cfpek8f6rigtu7nlro2d31bb3c8spdv.apps.googleusercontent.com";
FACEBOOK_APP_SECRET ="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"

const TWITTER_CONSUMER_KEY="87628802578-5gsgu39as5c0qiqriq6epr0eajaeg6fj.apps.googleusercontent.com";
const TWITTER_CONSUMER_SECRET="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";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile)
  }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
    },
    function (token, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);












passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});



  