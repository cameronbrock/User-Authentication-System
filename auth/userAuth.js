
const crypto = require('crypto');
const NodeCache = require('node-cache');
const config = require('../config.json');
const userSessionTable = require('../database/tables/userSessionTable.js');

const userSessionIdLength = config.encryption.user_session_id_length;
const userSessionIdEncoding = config.encryption.user_session_id_encoding;

const userTTL = config.user_cache.std_ttl; 

const cache = new NodeCache({
	stdTTL: config.cache.std_ttl,
	checkPeriod: config.cache.check_period
});

/*****************

Reminder: Set secret key as
environment variable, not
in memory!

******************/

const userAuth = {
	
	generateNewUserSessionId: function() {
		const newSessionId = crypto.randomBytes(userSessionIdLength)
								.toString(userSessionIdEncoding);
		return newSessionId;
	},
	
	cacheNewSession: function(_new_user_session_id, _user_handle) {
						
		// Assign user session ID to cache
		cache.set(_new_user_session_id, _user_handle);
		
		const sessionObject = {
			sessionId: _new_user_session_id,
			userHandle: _user_handle
		};
		
		return sessionObject;
	},

	getUserIdFromSessionId: function(_session_id) {
				
		// Get user data via session ID from database or cache
		// ...
		const userId = cache.get(_session_id);
		
		return userId;
	},
	
	cacheUserInfo: function(_user_handle, _user_data_object) {
		cache.set(_user_handle, _user_data_object, userTTL);
	},
	
	getCachedUserInfo: function(_user_handle) {
		const userData = cache.get(_user_handle);
		return userData;
	}
	
};

module.exports = userAuth;
