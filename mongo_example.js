"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err){
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // db.collection("tweets").find({}, (err, results) => {
    // db.collection("tweets").find().toArray((err, array) => {

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, array) => {
      if (err) {
        return callback(err);
      }
      callback(null, array);
    });
  }

    // console.log(results);

    // results.each((err, item) => console.log(item)); //for 'cursor' output

    // results.toArray((err, array) => {}
    //   if(err) throw err;

      // console.log('results Array:', array);
    // });

    // db.close();

  getTweets((err, array) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of array) {
      console.log(tweet);
    }

    db.close();
  });

});
