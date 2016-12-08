var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/album-demo');
var albumCollection = db.get('albums');

router.get('/albums', function(req, res, next) {
  res.render('albums/index');
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.post('/albums', function(req, res, next) {
  albumCollection.insert({ name: req.body.album_name });
  res.redirect('/albums');
});

router.get('/albums', function(req, res, next) {
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.get('/albums/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/show', {theAlbum: record});
    console.log(theAlbum);
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/edit', {theAlbum: record});
  });
});

router.post('/albums/:id/undefined/edit', function(req, res, next) {
  albumCollection.update({_id: req.params.id}, {$set: {name: req.body.name}});
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.post('/albums', function(req, res, next) {
  albumCollection.insert({ name: req.body.album_name });
  res.redirect('/albums');
});

module.exports = router;
