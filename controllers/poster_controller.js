var mongoose = require('mongoose'),
    Poster = mongoose.model('Poster'),
    User = mongoose.model('User');

exports.addPoster = function(req, res) {
      var newPoster = new Poster(req.body.newPoster);
      newPoster.提交用户代码 = req.session.username;
      newPoster.save(function(err){
        if (err) {
          console.log(err);
        } else {
          //console.log("new poster save");
          res.json({posterid:newPoster._id});
        }
    });
  };


exports.getPoster = function(req, res) {
      //console.log(req.params.id);
      Poster.findOne({_id:req.params.id})
      .exec(function(err, poster) {
        if (!poster){
          res.json(404,{err:'Poster Not Found.'});
        } else {
          //console.log(poster);
          res.json(poster);
        }
      });
  };

exports.getUserPosters = function(req, res) {
      //console.log(req.session.username);
      Poster.find({提交用户代码:req.session.username})
      .exec(function(err, posters) {
        if (!posters){
          res.json(404,{err:'Posters Not Found.'});
        } else {
          //console.log(poster);
          res.json(posters);
        }
      });
  };
  

