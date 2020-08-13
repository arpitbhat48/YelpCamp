const express   	=	require("express");
const router		= 	express.Router();
const Campground 	=	require("../models/campground");
const Comment 		=	require("../models/comment");
const middleware    =	require("../middleware");

// view all campgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log("Error occured");
		} else {
			res.render("campgrounds/index", {campgrounds : campgrounds});
		}
	});
});

// create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground ={name: req.body.name, price: req.body.price, image: req.body.image, description: req.body.description, author: author};
	Campground.create(newCampground, function(err, createdCamp){
		if(err){
			console.log("Error while adding new camp");
		} else {
			console.log("campground successfully added");
			// console.log(createdCamp);
			res.redirect("/campgrounds");
		}
	});
});

// add new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// display a campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log("Error while adding new camp");
		} else {
			res.render("campgrounds/show", {campground : foundCamp});
		}
	})
});

// edit campground
router.get("/:id/edit", middleware.campgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

// update campground
router.put("/:id", middleware.campgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
		if(err){
			res.redirect("/campground");
		} else {
			console.log(updatedCamp.id);
			console.log("campground updated");
			req.flash("success", "campground updated successfully");
			res.redirect("/campgrounds/" + updatedCamp.id);
		}
	});
});

// Delete campground
router.delete("/:id", middleware.campgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			console.log("error useless");
			res.redirect("/campgrounds");
		} else {
			Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
				if (err) {
					console.log("Comment del error");
					console.log(err);
				}
				console.log("Campground and comments removed");
				req.flash("success","Campground Removed Successfully");
				res.redirect("/campgrounds");
			});
		}
	});
});





module.exports = router;
