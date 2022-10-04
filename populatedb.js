#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true',
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Hikes = require('./models/hikes');
var Categories = require('./models/categories');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var hikes = [];
var categories = [];

function createHike(
  name,
  description,
  rating,
  miles,
  elevation,
  difficulty,
  directions,
  category,
  cb,
) {
  hikedetail = {
    name: name,
    description: description,
    rating: rating,
    miles: miles,
    elevation: elevation,
    difficulty: difficulty,
    directions: directions,
    category: category,
  };

  var hike = new Hikes(hikedetail);

  hike.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Hike: ' + hike);
    hikes.push(hike);
    cb(null, hike);
  });
}

function createCategory(name, description, cb) {
  var category = new Categories({ name: name, description: description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        createCategory(
          'Hiking',
          'A short or long, vigorous walk, usually on trails and footpaths.',
          callback,
        );
      },
      function (callback) {
        createCategory(
          'Scramble',
          'A hike that involves the use of hands to ascend steep terrain.',
          callback,
        );
      },
      function (callback) {
        createCategory(
          'Snowshoeing',
          'A hike that involves the use of snowshoes.',
          callback,
        );
      },
      function (callback) {
        createCategory(
          'Wildflowers',
          'A hike that involves the viewing of wildflowers.',
          callback,
        );
      },
      function (callback) {
        createCategory(
          'Lake',
          'A hike that involves the viewing of a lake.',
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
}

function createHikes(cb) {
  async.parallel(
    [
      function (callback) {
        createHike(
          'Chasm Lake',
          "Discover this 8.8-mile out-and-back trail near Estes Park, Colorado. Generally considered a challenging route, it takes an average of 5 h 12 min to complete. This is a very popular area for hiking, horseback riding, and snowshoeing, so you'll likely encounter other people while exploring. The best times to visit this trail are June through October. You'll need to leave pups at home — dogs aren't allowed on this trail.",
          5,
          8.8,
          2542,
          'hard',
          'https://www.google.com/maps/dir/Current+Location/40.27198,-105.55655',
          [
            categories[0],
            categories[1],
            categories[2],
            categories[3],
            categories[4],
          ],
          callback,
        );
      },
      function (callback) {
        createHike(
          'Chavez and Beaverbrook Trail Loop',
          'Discover this 5.0-mile loop trail near Golden, Colorado. Generally considered a moderately challenging route, it takes an average of 2 h 37 min to complete. This is a popular trail for hiking, snowshoeing, and running, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are March through November. Dogs are welcome, but must be on a leash.',
          4,
          5.0,
          1122,
          'moderate',
          'https://www.google.com/maps/dir/Current+Location/39.71531,-105.30904',
          [categories[0], categories[3]],
          callback,
        );
      },
      function (callback) {
        createHike(
          'Try this 13.1-mile loop trail near Silver Plume, Colorado. Generally considered a challenging route, it takes an average of 9 h 1 min to complete. This is a popular trail for birding and hiking, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are May through September.',
          'Discover this 5.0-mile loop trail near Golden, Colorado. Generally considered a moderately challenging route, it takes an average of 2 h 37 min to complete. This is a popular trail for hiking, snowshoeing, and running, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are March through November. Dogs are welcome, but must be on a leash.',
          5,
          13.1,
          4980,
          'hard',
          'https://www.google.com/maps/dir/Current+Location/39.69141,-105.80488',
          [categories[0], categories[1]],
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
}

async.series(
  [createCategories, createHikes],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Hikes: ' + hikes);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
