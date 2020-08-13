const mongoose 		= 	require("mongoose");
const Campground	=   require("./models/campground");
const Comment		=	require("./models/comment");



//  dummy campgrounds
var data = [
	{
		name: "Salmon Creek", 
		image: "https://image.shutterstock.com/image-photo/sunbeam-morning-around-camping-site-260nw-649280029.jpg", 
		description: "the biggest creek camp site, amazing trees and birds,get closer to nature. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	},
	{
		name: "Granite Hill", 
		image: "https://image.shutterstock.com/image-photo/friends-hikers-sitting-on-bench-260nw-587557163.jpg", 
		description: "This is a huge granite hill, not bathrooms, no water. Beautiful granite. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
	},
	{
		name: "Mountain Goats Rest", 
		image: "https://image.shutterstock.com/image-photo/tourist-near-his-camp-tent-260nw-741910681.jpg",
		description: "There are goats and mountains here. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
		author:{username: "harry"}
	}
]


function seedDB(){
	//Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		Comment.deleteMany({}, function(err) {
			if(err){
				console.log(err);
			}
			console.log("removed comments!");
			//add a few campgrounds
			// data.forEach(function(seed){
			// 	Campground.create(seed, function(err, campground){
			// 		if(err){
			// 			console.log(err)
			// 		} else {
			// 			console.log("added a campground");
			// 			//create a comment
			// 			Comment.create(
			// 				{
			// 					text: "This place is great, but I wish there was internet",
			// 					author: "Homer"
			// 				}, 
			// 				function(err, comment){
			// 					if(err){
			// 						console.log(err);
			// 					} else {
			// 						campground.comments.push(comment);
			// 						campground.save();
			// 						console.log("Created new comment");
			// 					}
			// 			});
			// 		}
			// 	});
			// });
		});
	}); 
	//add a few comments
}

module.exports = seedDB;