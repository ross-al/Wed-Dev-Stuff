//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//to connect to local host
//mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

// to connect to server

//to hide passwords
require("dotenv").config();
const password = process.env.MONGODB_PASSWORD;

// Replace the uri string with your connection string.
const database = "mongodb+srv://Cluster17314:"+password+"@cluster17314.dse6u8f.mongodb.net/?retryWrites=true&w=majority";

 mongoose.connect(database);

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter Name']
    }
  })

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({name: 'Shopping'});
const item2 = new Item({name: 'Laundry'});
const item3 = new Item({name: 'Cleaning'});

const defaultItems = [item1,item2, item3];


app.get("/", function(req, res) {

Item.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved default items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });

Item.find({})
  .then(function(items) {
    mongoose.connection.close();
    items.forEach(function(item) {
      res.render("list", {listTitle:'Today', newListItems: items});
    });
  })
  .catch(function(err) {
    console.log(err);
  });

});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({name: itemName});
  item.save();
  
});

//   if (req.body.list === "Work") 
//     workItems.push(item);
//     res.redirect("/work");
//   } else {
//     items.push(item);
//     res.redirect("/");
//   }
// 
// });

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
