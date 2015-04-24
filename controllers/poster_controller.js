var mongoose = require('mongoose'),
    Poster = mongoose.model('Poster');

exports.addPoster = function(req, res) {
      console.log("enter here");
      var newPoster = new Poster(req.body.newPoster);
      newPoster.save(function(err, comment){
        console.log("new poster saved");
      });
  };
