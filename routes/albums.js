var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/album-demo');
var albumCollection = db.get('albums');

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.post('/albums', function(req, res, next) {
  console.log(req.body);
  albumCollection.insert({ name: req.body.album_name, artist: req.body.album_artist, year: req.body.album_year, genre: req.body.album_genre});
  res.redirect('/albums');
});
//
// router.get('/albums', function(req, res, next) {
//   albumCollection.find({}, function (err, records) {
//     res.render('albums/index', {allAlbums: records});
//   });
// });

router.get('/albums/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/edit', {theAlbum: record});
    console.log(theAlbum);
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/edit', {theAlbum: record});
  });
});

router.get('/albums/:id/delete', function(req, res, next) {
  albumCollection.remove({_id: req.params.id});
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.post('/albums/:id/edit', function(req, res, next) {
  albumCollection.update({_id: req.params.id}, {$set: { name: req.body.album_name, artist: req.body.album_artist, year: req.body.album_year, genre: req.body.album_genre}});
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

router.post('/albums', function(req, res, next) {
  albumCollection.insert({ name: req.body.album_name, artist: req.body.artist, year: req.body.year, genre: req.body.genre});
  res.redirect('/albums');
});



module.exports = router;
