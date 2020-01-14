const request = require('request')

//tworze definicje swojej funkcji geocode
const geocode = (address, callback) => {
    //ustawiam url jako staly string ale na podstawie wejsciowego adresu
    const url  ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVtaWs0MCIsImEiOiJjazRiaHhqOGcwYThwM2xwYnh6NTlnYWJmIn0.AZSvuw3ZjrC1sSnxSzIj1Q&limit=1'

    //wywoluje metode obiektu request(http request) ktora bierze za parametr url, parsowanie json i funkcje anonimowa 
    //ta funkcja anonimowa jest wywolana z parametrami error i response - jest to callback dla metody request
    //czyli ta funkcja anonimowa zostanie wywolana z opoznieniem jak przyjda dane error i response
    //czyli tak jak z przykladem setTimeout gdzie po 2sekundach zachodzilo wywolanie
    request({ url, json: true}, (error, {body}) =>{
        //gdy juz przyjda dane error i response realizowane jest ponizsze cialo
        if(error){
            //gdy byl jakis error wywoluje moja wlasna fubkcje callback z odpowiednim stringiem
            callback('Unable to connect to services', undefined)
        }else if(body.features.length ===0){
            //gdy nie byylo erroru ale puste dane response to tez wywoluje moja callback ze stringiem
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })

}


module.exports = geocode