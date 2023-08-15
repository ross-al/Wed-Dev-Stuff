const mongoose = require('mongoose');

//local db only
mongoose.connect('mongodb://127.0.0.1:27017/kittens');


//kittens

const kittySchema = new mongoose.Schema({
     name: String
   });

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
silence.save()
console.log(silence.name); // 'Silence'

// const noise = new Kitten({ name: 'Noise' });
// noise.save()
// console.log(noise.name); 


// const kittens = Kitten.find();
// console.log(kittens);

//people 

const peopleSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Enter Name']
        },
    age: {
        type: Number,
        min: 0
    }, 
    favouriteKitten: kittySchema
})

const People = mongoose.model('People', peopleSchema);
const john = new People({name: 'John', age: 47});
john.save()

//console.log(People.find());


// const john2 = new People({name: 'John2', age: 47});
// const john3 = new People({name: 'John3', age: 47});
// const john4 = new People({name: 'John4', age: 47});

const jake = new People({name: 'Jake', age: 1});
const jessy = new People({name: 'Jessy', age: 23});

const defaultItems = [jake, jessy]

// People.insertMany([john2, john3, john4], function(err){
//     if(err){
//         console.log(err + ": error found")
//         return;
//     }
//     console.log("saved successfully")
// })

People.insertMany(defaultItems)
      .then(function () {
        console.log("Successfully saved default items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });

 // callbacks no longer supported...  

// People.find({},function(err, peoples){
//     if(err){
//         console.log(err);
//     } else {
//         peoples.forEach(function(person){
//             console.log(person.name);
//         })
//     }
// });


//update age test

People.updateMany({name: 'Jake'}, {age: 24 })
      .catch(function(err) {
        console.log(err);
 });

 People.updateOne({name:'Jake'}, {favouriteKitten: silence})
       .catch(function(err){
            console.log(err)
 })

 //wont delete everything as runs concurrently? 

 People.deleteMany({name: 'John3'})
    .catch(function(err){
        console.log(err)
 });

// Retrieving and printing people names
People.find({})
  .then(function(people) {
    mongoose.connection.close();
    people.forEach(function(person) {
      console.log(person.name + ": " + person.age);
    });
  })
  .catch(function(err) {
    console.log(err);
  });

