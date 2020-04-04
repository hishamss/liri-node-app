var Spotify = require("node-spotify-api");
require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var Input = process.argv;

if (Input[2] === "concert-this") {
  var artist = "";
  for (i = 3; i < Input.length; i++) {
    if (i == 3) {
      artist = Input[i];
    } else {
      artist += "+" + Input[i];
    }
  }
  var url =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      InqueryResponse = response.data;
      console.log(response.config.url);
      for (i = 0; i < InqueryResponse.length; i++) {
        console.log("Event#" + i + ":");
        console.log("Name of the venue: " + InqueryResponse[i].venue.name);
        console.log(
          "Venue location: " +
            InqueryResponse[i].venue.city +
            "," +
            InqueryResponse[i].venue.country
        );
        var FormattedDate = moment(InqueryResponse[i].datetime).format(
          "MM/DD/YYYY"
        );
        console.log("Date of the Event: " + FormattedDate);
        console.log("//////////////////");
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
} else if (Input[2] === "spotify-this-song") {
  var song = "";
  for (i = 3; i < Input.length; i++) {
    if (i == 3) {
      song = Input[i];
    } else {
      song += "+" + Input[i];
    }
  }

  if (!Input[3]) {
    song = "the+sign";
  }
  callspotify(song);
} else if (Input[2] === "movie-this") {
  var movie = "";
  for (i = 3; i < Input.length; i++) {
    if (i == 3) {
      movie = Input[i];
    } else {
      movie += "+" + Input[i];
    }
  }
  var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

  axios
    .get(url)
    .then(function (response) {
      console.log(response.data);
      console.log("Movie Name: " + response.data.Title);
      console.log("Released :" + response.data.Released);
      console.log("IMBD Rate :" + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rate :" + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function (err) {
      console.error("Error occurred: " + err);
    });
} else if (Input[2] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log("smth wrong happend");
    } else {
      if (data.split(",")[0] === "spotify-this-song") {
        callspotify(data.split(",")[1].replace(/"/gi, ""));
      }
    }
  });
}

function callspotify(song) {
  var url =
    "https://api.spotify.com/v1/search?query=" +
    song +
    "&type=track&offset=0&limit=5";

  spotify
    .request(url)
    .then(function (data) {
      //   console.log(data.tracks.items[0].album.name);
      //   console.log("////////////////");
      for (arr of data.tracks.items) {
        console.log("Artist : " + arr.album.artists[0].name);
        console.log("Song Name: " + arr.name);
        console.log("Song Link: " + arr.preview_url);
        console.log("Album: " + arr.album.name);
        console.log("///////////////////////////");
      }
    })
    .catch(function (err) {
      console.error("Error occurred: " + err);
    });
}
