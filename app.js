const express   	=	require("express");
const app   		=	express();
const bodyParser	=	require("body-parser");
const mongoose 		=	require("mongoose");
const passport		= 	require("passport");
const LocalStrategy =	require("passport-local");
const methodOverride=	require("method-override");
const Campground	=	require("./models/campground");
const Comment 		= 	require("./models/comment");
const User 			= 	require("./models/user");
const seedDB 		=	require("./seeds");
const flash 		= 	require("connect-flash");

const commentRoutes    	= require("./routes/comments"),
	  campgroundRoutes 	= require("./routes/campgrounds"),
	  indexRoutes 		= require("./routes/index");

mongoose.connect('mongodb://localhost/yelpcamp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

// passport coonfig
app.use(require("express-session")({
	secret: "snape is a good guy",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error	= req.flash("error");
	res.locals.success	= req.flash("success");
	next();
});

// Requiring routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Listen to server
app.listen(3000, function(){
	console.log("Yelpcamp server has started");
});
