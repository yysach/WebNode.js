const unirest = require('unirest');

const forecast = (lattitude,longitude, callback)=> {

    const forecastURL= "http://api.openweathermap.org/data/2.5/weather?lat="+lattitude+'&lon='+ longitude+"&appid=adae58be82568e0626e57f2a407cd404&units=metric";
    unirest
    .get(forecastURL)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .then(({ body }) => {
        if(body.error){
            return callback('unable to find the weather for location. Please try again !',undefined);
        }
      const data  = body;
      callback(undefined,data);
    });
}
module.exports = forecast;