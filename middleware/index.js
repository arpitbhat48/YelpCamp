const Campground 	=	require("../models/campground");
const Comment 		=	require("../models/comment");
var middlewareObj = {};

middlewareObj.campgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, found){
			if(err){
				req.flash("error", "Campground not found");
				console.log("authorisation error");
			} else {
				if(found.author.id.equals(req.user._id)){
					next();
				} else {
					console.log("No Authorisation");
					req.flash("error", "Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		console.log("No login");
		req.flash("error", "Please Log in first");
		res.redirect("back");
	}
}


middlewareObj.commentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, found){
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				if(found.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Permission denied");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Log in first");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
};

module.exports = middlewareObj;