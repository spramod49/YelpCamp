var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcyE6n3JUjx0O_H8rTa3RtVxNCVZC7s-bGj4cqp3pgHAno75y5w",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Cloud's rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN97vfu7QLYdG-SSONVvdlhH59aTc5ZOHLXMHSqQh2y9_JJGtE",
        description: "Meow Meow Meow Meow"
    },
    {
        name: "Cloud's rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWC4SeuAfJ2ySLnRNe2-qSWrbmWwGOJgPbMAZ-V9C55uHjFxk",
        description: "Woof woof woof woof"
    }
    ];

function seedDB(){
   Campground.remove({} , function(err){
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("Campgrounds removed!");
        //      data.forEach(function(seed){
        //      Campground.create(seed,function(err , campground){
        //             if (err) {
        //               console.log(err);
        //             } else {
        //                 console.log("Added data");
        //                 //Create comment
        //                 Comment.create({
        //                         text: "This is a seeds comment!",
        //                         author: "Test Author"
        //                 }, function(err , comment){
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Comment created");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}



module.exports = seedDB;