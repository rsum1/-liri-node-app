require("dotenv").config()

var keys = require('./keys')

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

const songInfo = (query, spotify) => {
  spotify
    .search({ type: 'track', query: query })
    .then(response => {
      let data = response.tracks.items[0].artists
      let artists = []
      data.forEach(artist => {
        artists.push(artist.name)
      })
      console.log(`Song Name: ${response.tracks.items[0].name}`)
      console.log(`Artist(s): ${artists.join(', ')}`)
      console.log(`Album: ${response.tracks.items[0].album.name}`)
      console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)
    })
    .catch(function (err) {
      console.log(err)
    });
}

switch (command) {
  case 'concert-this':
    findConcert(query, axios, moment)
    break;
  case 'spotify-this-song':
    if(query){
      songInfo(query, spotify)
    } else {
      songInfo('The Sign Ace Base', spotify)
    }
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