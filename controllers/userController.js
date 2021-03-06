
const userTable = require('../database/tables/userTable.js');

const UserController = {
	
	viewprofile: function(req, res) {
		
		const userHandle = req.params.userHandle;
		console.log(typeof userHandle);
		
		/*
		
			Information to retrieve from Database:
			- Username
			- Followers
			- Following
			- Bio
		*/
		
		userTable.getUserDisplayInfo(userHandle, (result) => {
			
			console.log(result);
			
			//console.log(result.rows[0].row);
			const queryIndex = 0;
			const userDataObject = result.rows[queryIndex];
			console.log('----- USER DATA OBJECT -----');
			console.log(userDataObject);
			console.log('----------------------------');
						
			const displayData = {
				handle: userHandle,
				username: userDataObject.username,
				num_followers: userDataObject.numfollowers,
				num_following: userDataObject.numfollowing,
				bio: userDataObject.bio
			};
			
			res.render('blogpage', displayData);
			
		});
		
		/*
		res.render('blogpage', {
			handle: 'h',
			username: 'u',
			num_followers: 0,
			num_following: 0,
			bio: 'b'
		});
		*/
	}
	
	
};

//module.exports = new UserController();
module.exports = UserController;
