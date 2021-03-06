
const bcrypt = require('bcrypt');
const userTable = require('../database/tables/userTable.js');
const userSessionTable = require('../database/tables/userSessionTable.js');
const dayjs = require('dayjs');
const geoip = require('geoip-lite');
const config = require('../config.json');
const userAuth = require('../auth/userAuth.js');

const numSaltRounds = config.num_bcrypt_salt_rounds;

const SignupController = {
	
	//** GET /signup
	index: function(req, res) {
		res.render('signup')
	},
	
	//** POST /signup/create_account
	createAccount: function(req, res) {
		
		dayjs.tz.setDefault(config.default_timezone);

		// Check whether the object we get back has all of
		// the information we need -- Otherwise, redirect
		// back to the signup page.
		if (!("username" in req.body) 
			|| !("handle" in req.body) 
			|| !("email" in req.body) 
			|| !("password1" in req.body) 
			|| !("password2" in req.body)) {
				res.redirect('/signup');
		}
		
		// Create new constants to store the values in.
		const username = req.body.username;
		const handle = req.body.handle;
		const email = req.body.email;
		const password1 = req.body.password1;
		const password2 = req.body.password2;
		
		if (password1 != password2) {
			res.redirect('/signup', {
				error: 'Passwords are not the same.'
			});
		}
		else {
		
			var password = password1;
			
			// Get the current time on the server's default timezone.
			// Format: yyyy/MM/dd*HH:mm:ss
			const timestamp_string_format = "YYYY-MM-DD hh:mm:ss";
			
			const current_time = dayjs();
			const current_time_formatted = dayjs(current_time, timestamp_string_format);
			const current_time_at_default_timezone = dayjs(current_time).tz(config.default_timezone);
			const current_time_at_default_timezone_formatted = dayjs(current_time_at_default_timezone, timestamp_string_format);
			
			// Get the user's timezone from their IP address.

			//const user_ip_address = req.socket.remoteAddress;
			//const user_ip_address = req.header('x-forwarded-for') || req.connection.remoteAddress;
			const user_ip_address = (config.debug == true) ?
										process.env.MYBLOG_IP_TEST :
										(req.header('x-forwarded-for') || req.connection.remoteAddress);
			console.log('USER IP -- ' + user_ip_address);
			
			// Get user IP address:
			var geo = geoip.lookup(user_ip_address);
			const user_timezone = geo.timezone;
			
			// Get server timezone:
			const server_timezone = dayjs.tz.guess();
			
			console.log('USER TIMEZONE -- ' + user_timezone);
			console.log('SERVER_TIMEZONE -- ' + server_timezone);

			bcrypt.genSalt(numSaltRounds).then((salt) => {
				bcrypt.hash(password, salt).then((_hashed_password) => {
					const hashedPassword = _hashed_password;
					password = hashedPassword;
					
					console.log("Hashed password: " + hashedPassword);
					console.log("Type of hashed password: " + (typeof hashedPassword));
					
					// Now create a new user record in the database using this
					// information.
					const queryData = {
						Username: username,
						Handle: handle,
						Password: hashedPassword,
						Bio: 'NULL',
						NumPosts: 0,
						NumFollowers: 0,
						NumFollowing: 0,
						Email: email,
						DateCreated: current_time_at_default_timezone_formatted,
						TimezoneOfUserCreation: user_timezone,
						UserTimezoneAtLastLogin: user_timezone,
					};
					
					userTable.createNewUserRecord(queryData, () => {
												
						// Create new user session for user
						const userSessionId = userAuth.generateNewUserSessionId();
						
						const session = userAuth.cacheNewSession(userSessionId, handle);
						userSessionTable.createNewUserSession(session.sessionId, session.userHandle, () => {
							return res.redirect(`/user/${handle}`);
						});
						
					});
					
				});
			});
		}
		
	}
}

//module.exports = new SignupController();
module.exports = SignupController;
