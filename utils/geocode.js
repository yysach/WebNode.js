const unirest = require('unirest');
const geocode = (address, callback)=> {

    const geoCodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieXlzYWNoIiwiYSI6ImNrY3cwaGFnNzAzeTYyeHF6aTlwNGE1NXMifQ.tNSR9zZ4yKxgwt5UooV0Nw&limit=1'
    unirest
    .get(geoCodeURL)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .then(( { body } ) => {
        if(body.features.length==0){
            return callback('unable to find the location. Please try again !',undefined);
        }
      const data  ={
          lattitude : body.features[0].center[1],
          longitude : body.features[0].center[0],
          location : body.features[0].place_name
      }
      callback(undefined,data);
    });
}

module.exports= geocode;