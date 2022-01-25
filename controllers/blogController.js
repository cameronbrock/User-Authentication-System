
class BlogController {
	
	viewblog = function(req, res) {
		res.render('blogpage', { handle: req.params.userHandle });
	}
	
}

module.exports = new BlogController();
