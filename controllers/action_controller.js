var mongoose = require('mongoose'),
    Poster = mongoose.model('Poster'),
    User = mongoose.model('User'),
    Action = mongoose.model('Action');     

exports.visitPoster = function(req, res) {
	//For Testing Purpose
	
	req.body.newAction = {
    "userid" : "55505c4b64b16ccf0e5c6939", 
    "posterid" : "55530fb6cbabc042078b8e96",
    "action" : [{
        "actiontype":"visit"
    }] };
    req.body.parent = {"parent":"55531cf8fd5ec9cd0b7d1489"};
    
  if(req.session.user){
    Action.findOne({_id:req.body.parent.parent})
    .exec(function(err, parentAction) {
        if(err){
          res.json(400,{errcode:1006});
        } else {
          if (!parentAction){
            res.json(400,{errcode:1006});
          } else {
          		if(parentAction.getChildren({condition:{userid:req.body.newAction.userid}})) {
          			res.json(403,{errorcode:1000});
          		} else {
	          		var newAction = new Action(req.body.newAction);
	                parentAction.appendChild(newAction,function(err){
	          		if(err) {
	            		res.json(400,{errorcode:1006});
	      			} else {
	            		res.json(200,newAction);
	          		}	
          		});
        	}       		
          }  
        } 
      }); 
  }else {
    res.json(403,{errorcode:1000});
  }    
};  

exports.rootPoster = function(req, res) {
    console.log(req.session.user);
    console.log(req.params.id);
    if(req.session.user){
    	Poster.findOne({_id:req.params.id})
    	.exec(function(err, poster) {
        if(err){
          res.json(400,{errcode:1006});
        } else {
          if (!poster){
            res.json(400,{errcode:1006});
          } else {
          		if(req.session.user == poster.create_userid){
          			if(Action.findOne({posterid:poster._id})){
          				res.json(403,{errorcode:1000});
          			} else {
          				var newAction = new Action;
          				newAction.userid = req.session.user;
          				newAction.posterid = poster._id;
          				newAction.save(function(err){
                  		if(err) {
                    		res.json(400,{errorcode:1006});
                  		} else {
                  			res.json(200,poster);
                  		}
                		});
          			} 
          		} else {
          			res.json(403,{errorcode:1000});
          		}
          	} 
          }});
	}    
};  