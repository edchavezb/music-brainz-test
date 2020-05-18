// Grab the axios package...
const axios = require("axios");
const inquirer = require("inquirer") 

// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)

async function getAlbums(bandName){

  let artistCall = await axios.get(`http://musicbrainz.org/ws/2/artist/?query=${bandName}&fmt=json`)
  
  let [artist1, artist2, artist3, artist4, artist5] = artistCall.data.artists
  console.log(artist1);
  
  let albumsCall = await axios.get(`http://musicbrainz.org/ws/2/artist/${artist1.id}?inc=release-groups&fmt=json`)
  //let albumsCall = await axios.get(`http://musicbrainz.org/ws/2/release?artist=${artist1.id}&type=album|ep&status=official&inc=recordings&fmt=json`)
  let albums = albumsCall['data']['release-groups'];
  let firstAlbum = albums[0];

  console.log(albums)

  for(let i = 0; i < 25; i++){
    console.log(albums[i].title)
  }
}

inquirer.prompt([
  {
    type: "input",
    message: "Enter the name of your favorite band",
    name: "band"
  },
]).then((input) => {

  getAlbums(input.band).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

});