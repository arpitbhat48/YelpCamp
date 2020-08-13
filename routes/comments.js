const express   	=	require("express");
const router		= 	express.Router({mergeParams: true});
const Campground 	=	require("../models/campground");
const Comment 		=	require("../models/comment");
const middleware    =	require("../middleware");


// New comments
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("comment error");
		} else {
			res.render("comments/new", {campground : campground});
		}
	});
});

// Create new comment
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("comment error!!");
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log("comment create error");
				} else {
					// console.log(req.user.username);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// console.log(comment);
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log("comment added");
					req.flash("success", "Comment Added");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// edit comment
router.get("/:comment_id/edit", middleware.commentOwnership, function(req, res){
	Comment.findById(req.params.comment_id,function(err, foundComment){
		if(err){
			console.log("comment edit error");
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// update comments
router.put("/:comment_id", middleware.commentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log("update comment errror");
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Delete comment
router.delete("/:comment_id", middleware.commentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log("comment del error");
			console.log("back");
		} else {
			req.flash("success", "Comment Deleted Successfully");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;