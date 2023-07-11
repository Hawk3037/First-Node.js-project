const express = require("express");
const { write } = require("fs");
const app = express();
const https = require('https');    
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req,res ){

        let country = req.body.city ;
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=c203ffcb264b292d4ce845d6ab147ee9&units=metric", function(response){
        console.log(response.statusCode );

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            let weatherDat = weatherData.weather[0].description;
            let temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const ic = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1> sky in "+country+ " is "+ weatherDat + "</h1>");
            res.write("<h3> temp in "+country+ " is "+temp + "</h3>");
            res.write("<img src="+ic+">");
            res.send();


        });
    });

});
    


app.listen(3000, function(){
    console.log("server is up");
});