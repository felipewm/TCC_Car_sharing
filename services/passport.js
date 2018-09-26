const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const user = mongoose.model('users');

passport.serializeUser((user, done) => {
		done(null, user.id);	
});
	
passport.deserializeUser((id, done) => {
	user.findById(id).then(user => {
		done(null, user)
	});
});

passport.use(
	new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, 
	(accessToken, refreshToken, profile, done)=> {
		
			user.findOne({ googleId: profile.id }).then((existingUser) => {
				if(existingUser) {
					//ja existe um usuario com este profile ID
					done(null, existingUser);
					
				} else{
					// não existe registro deste usuario com este profile ID
					new user({ googleId: profile.id })
						.save()
						.then( user => done(null, user));
				}
			});
		}
    )
);