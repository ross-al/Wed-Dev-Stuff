const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

})

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const apiKey = "ad46589d372237e7183c64c8e9900e23";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather in " + query + " is " + desc + "</h1>")
            res.write("<p> The temparature is " + temp + "</p>");
            res.write("<img src="+ imgURL + ">");
            res.send();
        })
    });

})


  

 



app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})