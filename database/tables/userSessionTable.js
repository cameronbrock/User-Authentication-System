
const database = require('../database.js');

const userSessionTable = {
	
	createTable: function() {
		
		const queryName = 'create-new-user-session';
		
		const queryString = `
			CREATE TABLE UserSession (
				Id SERIAL NOT NULL PRIMARY KEY,
				SessionId VARCHAR NOT NULL UNIQUE,
				UserHandle VARCHAR(20) NOT NULL UNIQUE
			);
		`;
		
		const queryValues = [];
		
		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryValues
		};
		
		database.makeQuery(queryObj, (result) => {
			console.log(result);
		});
		
	},
	
	createNewUserSession: function(_session_id, _user_handle, _result_function) {
		
		const queryName = 'create-new-user-session';
		
		const queryString = `
			INSERT INTO UserSession (
				SessionId,
				UserHandle
			) VALUES (
				$1,
				$2
			);
		`;
		
		const queryValues = [_session_id, _user_handle];
		
		const queryObj = {
			name: queryName,
			text: queryString,
			values: queryValues
		};
		
		database.makeQuery(queryObj, _result_function);
	}
	
};

module.exports = userSessionTable;