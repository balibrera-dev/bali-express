const mongoose = require('mongoose');

const RouteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
    },
    daysOfWeek: {
      type: [String],
      required: true,
      validate: [
        (value) => value.length > 0,
        'Add at least one day of the week',
      ],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stops: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stops',
      required: true,
    },
  },
  { timestamps: true }
);

// RouteSchema.pre('remove', async function (next) {
//   await this.model('Stop').deleteMany({ route: this._id });
// });

module.exports = mongoose.model('Route', RouteSchema);
