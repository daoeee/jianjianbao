var mongoose = require('mongoose'),
    Poster = mongoose.model('Poster'),
    User = mongoose.model('User');

exports.addPoster = function(req, res) {
      var newPoster = new Poster(req.body.newPoster);
      newPoster.set('username',req.session.username);
      console.log(req.session.userName);
      console.log(newPoster);
      newPoster.save(function(err){
        if (err) {
          console.log("new poster failed"); 
          //res.redirect("/poster") ;
        } else {
          console.log("new poster save");
          res.json({posterid:newPoster._id});
        }
    });
  };
