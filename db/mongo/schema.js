const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jumpstarter')
  .then(console.log('Connected'))
  .catch(error => console.error('connection error', error.message, error.stack));

const levelSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  levelId: Number,
  userId: Number,
  projectId: Number,
  startingCutoffAmount: Number,
  name: String,
  description: String,
  estimatedDelivery: Date,
  shipsTo:String,
  includes: Array,
  maxBackers: Number,
  });

const userSchema = mongoose.Schema({
  id: {type: Number, unique: true }
});

const disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed');
    process.exit(0);
  });
};
