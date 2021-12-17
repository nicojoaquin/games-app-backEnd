const {Schema, model} = require('mongoose');

const EventSchema = new Schema({

  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

})

module.exports = model('Event', EventSchema);