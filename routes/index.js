const express   	=	require("express");
const router		= 	express.Router();
const passport		= 	require("passport");
const User 			=	require("../models/user");

// Landing page
router.get("/", function(req, res){
	res.render("landing");
});


// Show Register form
router.get("/register", function (req, res){
	res.render("register");
});

// Handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err);
			return res.render("register");
		} else {
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to Yelpcamp");
				res.redirect("/campgrounds")
			});
		}
	});
})

// Show login page
router.get("/login", (req, res) => {
  	res.render("login");
});

// Logging in
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),	(req, res) => {
		req.flash("error", "You have Logged in Successfully");
});

// Logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("error", "Succesfully Logged Out")
	res.redirect("/campgrounds");
});

module.exports = router;