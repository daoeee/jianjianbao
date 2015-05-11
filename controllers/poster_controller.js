var mongoose = require('mongoose'),
    Poster = mongoose.model('Poster'),
    User = mongoose.model('User');

exports.addPoster = function(req, res) {
  if(req.session.user){
    var newPoster = new Poster(req.body.newPoster);
    newPoster.create_userid = req.session.user;
    newPoster.save(function(err) {
      if (err) {
        res.json(400,{errorcode:1006});
      } else {
        res.json(200,newPoster);
      }
    });
  } else {
    req.json(403,{errorcode:1000});
  }
};


exports.getPoster = function(req, res) {
  if(req.session.user){
    Poster.findOne({_id:req.params.id})
    .exec(function(err, poster) {
      if(err){
        res.json(400,{errcode:1006});
      } else {
        if (!poster){
          res.json(400,{errcode:1006});
        } else {
          if(req.session.user == poster.create_userid) {
            res.json(200,poster);
          } else {
            res.json(403,{errorcode:1000});
          }
        }  
      }
    });     
  } else {
    res.json(403,{errorcode:1000});
  }    
};

exports.delPoster = function(req, res) {
  if(req.session.user){
    Poster.findOne({_id:req.params.id})
    .exec(function(err, poster) {
        if(err){
          res.json(400,{errcode:1006});
        } else {
          if (!poster){
            res.json(400,{errcode:1006});
          } else {
              if(req.session.user == poster.create_userid) {
                poster.remove(function(err){
                  if(err) {
                    res.json(400,{errorcode:1006});
                  } else {
                    res.json(200);
                  }
                });
              }else {
                res.json(403,{errorcode:1000});
              }
          }  
        } 
      }); 
  }else {
    res.json(403,{errorcode:1000});
  }    
};


exports.getUserPosters = function(req, res) {
  if(req.session.user == req.params.id){
    Poster.find({create_userid:req.params.id})
    .exec(function(err, posters) {
      if (!posters){
        res.json(404,{errcode:1001});
      } else {
        res.json(posters);
      }
    });
  }else {
    res.json(403,{errorcode:1001});
  }
};
  

