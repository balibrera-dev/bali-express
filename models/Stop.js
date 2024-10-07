const mongoose = require('mongoose');

const StopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name'],
      minlength: 3,
      maxlength: 50,
    },
    address: {
      country: {
        type: String,
        required: [true, 'country'],
      },
      city: {
        type: String,
        required: [true, 'city'],
      },
      municipality: {
        type: String,
        required: [true, 'municipality'],
      },
    },
    geolocation: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    arrivalTime: { type: Date, required: [true, 'arrival time'] },
    departureTime: { type: Date, required: [true, 'departure time'] },
    picture: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    locker: { type: Boolean, default: false },
    route: {
      type: mongoose.Schema.ObjectId,
      ref: 'Route',
      required: [true, 'No route has been provided for this stop'],
    },
  },
  { timestamps: true }
);
StopSchema.index({ name: 1, route: 1 }, { unique: true });

module.exports = mongoose.model('Stop', StopSchema);
