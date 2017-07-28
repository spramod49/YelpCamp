//ALL THE MIDDLEWARE GOES HERE
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};
var flash =  require("connect-flash");

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error" , "You don't have permission to do that!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error" , "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // body...
     if (req.isAuthenticated()) 
     {
            Campground.findById(req.params.id, function(err, foundCampground) {
                if (err) 
                {
                    req.flash("error" , "Campground not found");
                    res.render("landing");       
                } 
                else 
                {
                    if (foundCampground.author.id.equals(req.user._id)) 
                        {
                           next();
                        } 
                    else 
                        {
                            req.flash("error" , "You don't have permissions to do that!");
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                }
                
        });
    } 
    else 
    {
            req.flash("error" , "You need to be logged in to do that!");
            res.render("login");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;