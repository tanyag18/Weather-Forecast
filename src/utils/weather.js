const request = require('request')

const weather = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=09e1cba876cdfcf5e35049f75de39b7a&query='+latitude+','+longitude+'&units=f'
    request({url, json: true}, (error,{body}) => {
        if(error){
                callback("Unable to connect to weather server")
           }
        else if(body.error){
           callback("Unable to find location");
        }
        else{
            callback(undefined,'It is '+ body.current.weather_descriptions[0] +' and the temperature is '+body.current.temperature+ ' degrees. But doesnt it feels like '+body.current.feelslike+'? :))')
        }
    })
}

module.exports=weather