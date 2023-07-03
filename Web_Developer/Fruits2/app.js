const mongoose = require('mongoose');

//local db only
mongoose.connect('mongodb://127.0.0.1:27017/kittens');

const kittySchema = new mongoose.Schema({
    name: String
  });

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
silence.save()
console.log(silence.name); // 'Silence'

const noise = new Kitten({ name: 'Noise' });
noise.save()
console.log(noise.name); 


const kittens = Kitten.find();
console.log(kittens);


