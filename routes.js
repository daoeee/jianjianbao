var crypto = require('crypto');
var express = require('express');
var multer = require('multer');

module.exports = function(app) {
  var users = require('./controllers/users_controller');
  var poster = require('./controllers/poster_controller');
  var action = require('./controllers/action_controller');
  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/signup', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
  });
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.get('/poster', function(req, res){
    if(req.session.user){
      res.render('poster');
    }else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });
  app.get('/posterpage/:id', function(req, res){
    if (req.session.user) {
      res.render('posterpage');
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
  });

  //User API
  app.post('/signup', users.signup);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);

  //Poster API
  app.post('/api/v1/poster', poster.addPoster);
  app.delete('/api/v1/poster/:id',poster.delPoster);
  app.put('/api/v1/poster/:id',poster.updatePoster);
  //app.post('/api/v1/poster/:id',poster.uploadImage);
  app.get('/api/v1/poster/:id',poster.getPoster);
  //app.get('/api/v1/poster/:id/comments',poster.getComments);
  app.get('/api/v1/poster/user_created/:id',poster.getUserPosters);

  //Poster Action API
  app.post('/api/v1/poster/:id/visit', action.visitPoster); 
  app.post('/api/v1/poster/:id/root', action.rootPoster);   
  //app.delete('/api/v1/poster/:id/unforward/',poster.actUnForward);
}