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
	async (accessToken, refreshToken, profile, done)=> {
		const existingUser = await user.findOne({ googleId: profile.id });		
			if(existingUser) {
				//ja existe um usuario com este profile ID
				return done(null, existingUser);	
			} 
			// não existe registro deste usuario com este profile ID
			const notExistingUser = await new user({ googleId: profile.id }).save();
			done(null, notExistingUser);
		}
    )
);