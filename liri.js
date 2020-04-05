var Spotify = require("node-spotify-api");
require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var Input = process.argv;
var text = "node liri.js ";

for (i = 2; i < Input.length; i++) {
  text += Input[i] + " ";
}
log(text + "\r\n");

if (Input[2] === "concert-this") {
  var artist = "";
  for (i = 3; i < Input.length; i++) {
    if (i == 3) {
      artist = Input[i];
    } else {
      artist += "+" + Input[i];
    }
  }
  if (!Input[3]) {
    artist = "Celine+Dion";
  }
  callbandintown(artist);
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
  if (!Input[3]) {
    movie = "Mr.+Nobody";
  }
  callomdb(movie);
} else if (Input[2] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log("smth wrong happend");
      log("smth wrong happend\r\n");
    } else {
      if (data.split(",")[0] === "spotify-this-song") {
        callspotify(data.split(",")[1].replace(/"/gi, ""));
      } else if (data.split(",")[0] === "movie-this") {
        callomdb(data.split(",")[1].replace(/"/gi, ""));
      } else if (data.split(",")[0] === "concert-this") {
        callbandintown(data.split(",")[1].replace(/"/gi, ""));
      } else {
        console.log("invalid data in random.txt");
        log("invalid data in random.txt\r\n");
      }
    }
  });
} else {
  console.log(
    "Invalid Input!!!\r\nUsage: node liri.js [concert-this/spotify-this-song/movie-this/do-what-it-says]"
  );
}

function callspotify(song) {
  var url =
    "https://api.spotify.com/v1/search?query=" +
    song +
    "&type=track&offset=0&limit=2";

  spotify
    .request(url)
    .then(function (data) {
      // console.log(data.tracks.items);
      //   console.log("////////////////");
      for (arr of data.tracks.items) {
        // check if the name of the song entered match exactly with the output ex: the sign != the signal fire
        if (arr.name.toLowerCase() === song.replace(/\+/g, " ")) {
          console.log(
            "Artist : " +
              arr.album.artists[0].name +
              "\r\n" +
              "Song Name: " +
              arr.name +
              "\r\n" +
              "Song Link: " +
              arr.preview_url +
              "\r\n" +
              "Album: " +
              arr.album.name +
              "\r\n" +
              "///////////////////////////\r\n"
          );
          log(
            "Artist : " +
              arr.album.artists[0].name +
              "\r\n" +
              "Song Name: " +
              arr.name +
              "\r\n" +
              "Song Link: " +
              arr.preview_url +
              "\r\n" +
              "Album: " +
              arr.album.name +
              "\r\n" +
              "///////////////////////////" +
              "\r\n"
          );
        }
      }
    })
    .catch(function (err) {
      console.error("Error occurred: " + err);
      log("Error occurred: " + err + "\r\n");
    });
}

function callomdb(movie) {
  var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

  axios
    .get(url)
    .then(function (response) {
      console.log(
        "Movie Name: " +
          response.data.Title +
          "\r\n" +
          "Released :" +
          response.data.Released +
          "\r\n" +
          "IMBD Rate :" +
          response.data.Ratings[0].Value +
          "\r\n" +
          "Rotten Tomatoes Rate :" +
          response.data.Ratings[1].Value +
          "\r\n" +
          "Country: " +
          response.data.Country +
          "\r\n" +
          "Plot: " +
          response.data.Plot +
          "\r\n" +
          "Actors: " +
          response.data.Actors +
          "\r\n" +
          "///////////////////////////\r\n"
      );
      log(
        "Movie Name: " +
          response.data.Title +
          "\r\n" +
          "Released :" +
          response.data.Released +
          "\r\n" +
          "IMBD Rate :" +
          response.data.Ratings[0].Value +
          "\r\n" +
          "Rotten Tomatoes Rate :" +
          response.data.Ratings[1].Value +
          "\r\n" +
          "Country: " +
          response.data.Country +
          "\r\n" +
          "Plot: " +
          response.data.Plot +
          "\r\n" +
          "Actors: " +
          response.data.Actors +
          "\r\n" +
          "///////////////////////////\r\n"
      );
    })
    .catch(function (err) {
      console.error("Error occurred: " + err);
      log("Error occurred: " + err + "\r\n");
    });
}

function callbandintown(artist) {
  var url =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(url)
    .then(function (response) {
      // handle success
      InqueryResponse = response.data;

      for (i = 0; i < InqueryResponse.length; i++) {
        var FormattedDate = moment(InqueryResponse[i].datetime).format(
          "MM/DD/YYYY"
        );
        console.log(
          "Event#" +
            i +
            ":" +
            "\r\n" +
            "Name of the venue: " +
            InqueryResponse[i].venue.name +
            "\r\n" +
            "Venue location: " +
            InqueryResponse[i].venue.city +
            "," +
            InqueryResponse[i].venue.country +
            "\r\n" +
            "Date of the Event: " +
            FormattedDate +
            "\r\n//////////////////\r\n"
        );
        log(
          "Event#" +
            i +
            ":" +
            "\r\n" +
            "Name of the venue: " +
            InqueryResponse[i].venue.name +
            "\r\n" +
            "Venue location: " +
            InqueryResponse[i].venue.city +
            "," +
            InqueryResponse[i].venue.country +
            "\r\n" +
            "Date of the Event: " +
            FormattedDate +
            "\r\n" +
            "//////////////////" +
            "\r\n"
        );
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      log(error + "\r\n");
    });
}

function log(logtext) {
  fs.appendFile("log.txt", logtext, function (err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  });
}
