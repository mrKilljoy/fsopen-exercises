const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error while connecting to MongoDB:', error.message);
    });

// phone record schema
const recordSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Record', recordSchema);