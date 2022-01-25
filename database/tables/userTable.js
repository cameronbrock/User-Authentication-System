
const database = require('../database.js');
const bcrypt = require('bcrypt');

const getUserIdFromHandle = function(_user_handle) {
	const queryName = 'get-id-from-handle';
	
	const queryString = `
		SELECT Id FROM BlogUser WHERE Handle=$1;
	`;
	
	
}

const userTable = {
	
	createTable: function() {
							
		const queryString = `
			CREATE TABLE BlogUser (
				Id SERIAL NOT NULL PRIMARY KEY,
				Username VARCHAR(100) NOT NULL,
				Handle VARCHAR(20) NOT NULL UNIQUE,
				Password VARCHAR NOT NULL,
				Bio VARCHAR(300) DEFAULT '',
				NumPosts BIGINT NOT NULL DEFAULT 0,
				NumFollowers INT NOT NULL DEFAULT 0,
				NumFollowing INT NOT NULL DEFAULT 0,
				Email VARCHAR(320),
				DateCreated TIMESTAMP NOT NULL,
				TimezoneOfUserCreation VARCHAR NOT NULL,
				UserTimezoneAtLastLogin VARCHAR NOT NULL
			);
		`;
							
		database.makeQuery(queryString, (result) => {
			console.log(result);
		});
							
		
	},
	
	createNewUserRecord: function(newUserObject, resultFunction) {
		
		const queryName = 'create-new-user';
		
		const queryString = `
			INSERT INTO BlogUser (
				Username,
				Handle,
				Password,
				Bio,
				Email,
				DateCreated,
				TimezoneOfUserCreation,
				UserTimezoneAtLastLogin
			) VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8
			);
		`;
		
		const queryValues = [
			newUserObject.Username,
			newUserObject.Handle,
			newUserObject.Password,
			newUserObject.Bio,
			newUserObject.Email,
			newUserObject.DateCreated,
			newUserObject.TimezoneOfUserCreation,
			newUserObject.UserTimezoneAtLastLogin
		];
		
		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryValues
		};
				
		console.log("Query string:\n");
		console.log(queryString);
		
		database.makeQuery(queryObj, resultFunction);
							
	},
	
	
	getUserDisplayInfo: function(userHandle, resultFunction) {
		const queryName = 'get-profile-display-info';
		
		const queryString = `
			SELECT Id, Username, NumFollowers, NumFollowing, Bio
			FROM BlogUser
			WHERE Handle = $1;
		`;
		
		const queryData = [userHandle];
		
		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryData
		};
		
		database.makeQuery(queryObj, resultFunction);
	},
	
	authenticateUser: function(_user_handle, _password) {
		// First, retrieve 
		const queryName = 'get-hashed-password';
		
		const queryString = `
			SELECT Id, Handle, Password
			FROM BlogUser
			WHERE Handle = $1;
		`;
		
		const queryData = [_user_handle];
		
		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryData
		};
		
		database.makeQuery(queryObj, (result) => {
			const hashedPassword = result.password;
			const userId = result.id;
			const userHandle = result.handle;
			bcrypt.compare(_password, hashedPassword)
				.then((isValidPassword) => {
					const authData = {
						isValidPassword: isValidPassword,
						userId: userId,
						userHandle: userHandle
					};
					return authData;	
				});
		});
		
	},
	
	updateBio: function(_user_handle, _new_bio, _result_function) {
		
		const queryName = 'update-user-bio';
		
		const queryString = `
			UPDATE BlogUser
			SET Bio = $1
			WHERE Handle = $2;
		`;
		
		const queryData = [
			_new_bio,
			_user_handle
		];

		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryData
		};
		
		database.makeQuery(queryObj, _result_function);
		
	}
	
};

module.exports = userTable;
