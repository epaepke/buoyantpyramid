var db = require('../db/database');
var Song = db.Song;
var Comment = db.Comment;
var request = require('request');
var Promise = require('bluebird');
var awsConfig = require('../config/aws.config.js');
var config = require('../config/config.js');
var uploadController = require('../controllers/upload.js');


var addSong = function (songData) {
  return Song.create(songData);
};

var addCompressedLink = function(songID, compressedID, amplitudeData) {
  console.log('--- --- Add compressed link Song.find() update DB', songID, compressedID);
  return new Promise(function(resolve, reject) {
    Song.find({where: {id: songID}})
    .then(function(song) {
      if (song) {
        song.updateAttributes({
          'compressedAddress': 'https://' + awsConfig.bucket + '.s3.amazonaws.com/audio/' + compressedID,
          'amplitudeData': amplitudeData
        });
        resolve();
      }
    })
    .catch(function(err) {
      reject(err);
    });
  });
};

var getComments = function(songId) {
  return new Promise(function (resolve, reject) {
    Song.findById(songId)
    .then(function(song) {
      if (song) {
        resolve(song.getComments());
      } else {
        resolve([]);
      }
    });
  });
};

var getSong = function(songId) {
  return Song.findById(songId);
};

var updateSong = function(song) {
  return Song.update(song, {
    where: { id: song.id },
    fields: ['title', 'description', 'dateRecorded', 'imageUrl'],
    returning: true
  });
};


// TODO: why is this a promise?
var requestFileCompression = function(song) {
  return new Promise(function (resolve, reject) {    
    var url = config.ZENCODER_COMPRESSION_SERVER;
    var fileSource = song.dataValues.address;
    var fileDestination = 'https://s3-us-west-1.amazonaws.com/jamrecordtest/audio/';

    var params = {
      'api_key': config.ZENCODER_API_KEY,
      'input': song.dataValues.address,
      'outputs': [
        {
          'url': fileDestination + song.dataValues.uniqueHash + '.mp3',
          'credentials': 'jamrecordtest',
          'audio_normalize': true
        }
      ],
    };

    request.post(
      url,
      { json: params },
      function (error, response, body) {
        if (error) {
          console.log('--- --- Request compression error: ', error);
          reject(error);
        } else if (!error && response.statusCode === 201) {
          console.log(' --- --- Successful creation of new audio on zencoder: ', body);
          resolve(body);
        }
      }
    );

  });
};

module.exports = {
  addCompressedLink: addCompressedLink,
  addSong: addSong,
  getComments: getComments,
  getSong: getSong,
  updateSong: updateSong,
  requestFileCompression: requestFileCompression
};