var express = require("express"),
Campground = require("../models/campground"),
passport =require("passport"),
router  = express.Router();
var middleware = require("../middleware");
router.get("/" , function(req , res){
     Campground.find({}, function(err, allCampgrounds){
         if (err) {
             console.log("Could not find any campgrounds");
             res.send("DB error");
         } else {
             res.render("campgrounds/index" , {campgrounds:allCampgrounds});
         }
     });
});

router.post("/" ,  middleware.isLoggedIn, function(req, res){
    var name = req.body.campground;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name : name, image : image, description: desc , author: author};
    Campground.create(newCampground, function(err, campground){
       if (err) {
           console.log("There was an error while inserting the data!");
           res.send("ERROR!");
       } else {
           console.log(campground);
            res.redirect("/campgrounds");       
       }
    });
});

router.get("/new" , middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

router.get("/:id" , function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
        if (err) {
            console(err);
        } else {
            res.render("campgrounds/show" , {campground:foundCampground} );
        }
    });
});

//EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //is user logged in
            Campground.findById(req.params.id, function(err, foundCampground) {
                    res.render("campgrounds/edit" , {campground:foundCampground} );
        });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

router.delete("/:id" , middleware.checkCampgroundOwnership, function(req,res) {
     Campground.findByIdAndRemove(req.params.id , function(err){
        if (err) {
            res.send("Unable to delete, please try again.");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;