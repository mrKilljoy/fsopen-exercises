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
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      message: props => `${props.value} is not a valid phone number!`,
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }
    }
  }
});

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Record', recordSchema);