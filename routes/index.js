var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/album-demo');
var albumCollection = db.get('albums');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Andrew\'s Express-MongoDB Practice' });
});

router.get('/albums', function(req, res, next) {
  albumCollection.find({}, function (err, records) {
    res.render('albums/index', {allAlbums: records});
  });
});

module.exports = router;
