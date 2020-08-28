const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../users/users.model');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// TODO: Revisar Oauth. No controla userType
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Error handling.
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const avatarUrl = profile.photos[0].value || null;
        user = await new User({
          name: profile.displayName,
          facebookId: profile.id,
          avatarUrl: avatarUrl
        }).save();
      }
      done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      // TODO: Error handling
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const avatarUrl = profile.photos[0].value || null;
        user = await new User({
          username: 'rtrtr',
          name: profile.displayName,
          googleId: profile.id,
          avatarUrl: avatarUrl
        }).save();
      }
      done(null, user);
    }
  )
);
