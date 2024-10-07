const mongoose = require('mongoose');
const validator = require('validator');

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg',
  },
  socialMedia: [socialMediaSchema],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  routes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
  ],
});

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['Facebook', 'Facebook Group', 'Instagram', 'Pinterest', 'Tik Tok'],
    required: true,
  },
  platform: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Business', BusinessSchema);
