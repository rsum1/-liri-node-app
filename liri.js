require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

var axios = require('axios')
var moment = require('moment')
let command = process.argv[2]
let query = process.argv[3]

const findConcert = (query, axios, moment) => {
  axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
    function (response) {
      if (response.data != 0) {
        let venueName = response.data[0].venue.name
        let venueLat = response.data[0].venue.latitude
        let venueLon = response.data[0].venue.longitude
        let concertDate = response.data[0].datetime
        console.log(`The Venue is called ${venueName}`)
        console.log(`The coordinates are Lat:${venueLat}, Lon:${venueLon}`)
        console.log(`The concert date is ${moment(concertDate)}`)
      } else {
        console.log('No Concerts Found')
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

switch (command) {
  case 'concert-this':
    findConcert(query, axios, moment)
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