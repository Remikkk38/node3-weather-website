const request = require('request')



//definiuje swoja funkcje ktora bierze za parametry dlugosc i szerokosc geograficzna i cialo definicji callback funkcji
const forecast = (lat, long, callback) => {

    //ustalam string url dla zapytania API na podstawie podanych lat i long
    const url = 'https://api.darksky.net/forecast/6bb56c7eb6f1fbaa0867ab34531cd78e/'+ lat + ',' + long + '?units=si&lang=pl'

        //wywoluje metode http request i jak dostane error i responce to wykonam cialo funkcji
        //czyli ta metoda ma w sobie tez callback i jak jakas funkcja/ metoda ma callback to czeka z wykonaniem sie
        //az dostanie dane np z innego serwera
        request({ url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to srevice', undefined)
        }else if(body.error) {
            callback('Unable to find location', undefined)
        }else{   
            //to wywoluje moj callback z error jako undefined i data jako javascript obiect {result: ----string----}
            callback(undefined, {
                result: body.daily.data[0].summary + " It is currently " + body.currently.apparentTemperature + " degrees out" +
                " There is " + body.currently.precipProbability +"% chance of rain."
            })

            }  
        })
    }







module.exports = forecast