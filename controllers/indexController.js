
class IndexController {
	
	landingpage = function(req, res) {
		const isSignedIn = false;
		
		if (isSignedIn) {
			res.redirect('/home');
		}
		else {
			res.redirect('/signup');
		}
	}
	
	homepage = function(req, res) {
		res.render('index')
	}
	
}

module.exports = new IndexController();
