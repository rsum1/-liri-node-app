require("dotenv").config()

command = process.argv[2]
query = process.argv[3]

const findConcert = (query, axios, moment) => {
  axios
    .get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
    .then(
      response => {
        if (response.data != 0) {
          console.log(`The Venue is called ${response.data[0].venue.name}`)
          console.log(`The coordinates are Lat:${response.data[0].venue.latitude}, Lon:${response.data[0].venue.longitude}`)
          console.log(`The concert date is ${moment(response.data[0].datetime)}`)
        } else {
          console.log('No Concerts Found')
        }
      })
    .catch(error => console.log(error))
}

const songInfo = (query, spotify) => {
  spotify
    .search({ type: 'track', query: query })
    .then(
      response => {
        let artists = []
        response.tracks.items[0].artists.forEach(artist => {
          artists.push(artist.name)
        })
        console.log(`Song Name: ${response.tracks.items[0].name}`)
        console.log(`Artist(s): ${artists.join(', ')}`)
        console.log(`Album: ${response.tracks.items[0].album.name}`)
        console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)
      })
    .catch(err => console.log(err))
}

const movieInfo = (query, axios) => {
  axios
    .get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy")
    .then(
      response => {
        console.log("Movie Title: " + response.data.Title)
        console.log("Release Date: " + response.data.Released)
        console.log("IMDB Rating: " + response.data.imdbRating)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("Production Country: " + response.data.Country)
        console.log("Language(s): " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
      })
    .catch(err => console.log(err))
}

const readRandom = (text) => {
  var liriFunction = text.slice(0, text.indexOf(","))
  var liriInput = text.slice(text.indexOf(",") + 1, text.length)
  mainProgram(liriFunction, liriInput)
}

var mainProgram = (command, query) => {

  var axios = require('axios')
  var fs = require('fs')
  var keys = require('./keys')
  var moment = require('moment')
  var Spotify = require('node-spotify-api')

  var spotify = new Spotify(keys.spotify)

  switch (command) {
    case 'concert-this':
      findConcert(query, axios, moment)
      break;
    case 'spotify-this-song':
      if (query) {
        songInfo(query, spotify)
      } else {
        songInfo('The Sign Ace Base', spotify)
      }
      break;
    case 'movie-this':
      if (query) {
        movieInfo(query, axios)
      } else {
        movieInfo('Mr. Nobody', axios)
      }
      break;
    case 'do-what-it-says':
      fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
          return console.log(error)
        }
        readRandom(data)
      })
      break;
    default:
      console.log('errors')
      break
  }
}

mainProgram(command, query)
