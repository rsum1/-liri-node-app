require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

var axios = require('axios')

let command = process.argv[2]
let query = process.argv[3]

switch (command) {
  case 'concert-this':
    findConcert(query)
    break;
  case 'spotify-this-song':
    songInfo(query)
    break;
  case 'movie-this':
    movieInfo(query)
    break;
  // case 'do-what-it-says':

  //   break;
  default:
    console.log('error')
    break
}