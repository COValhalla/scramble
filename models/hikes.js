const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HikesSchema = new Schema({
  name: { type: String, required: true, maxLength: 60 },
  description: { type: String, required: true, maxLength: 1000 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  miles: { type: Number, required: true, min: 0, max: 100 },
  elevation: { type: Number, required: true, min: 0, max: 60000 },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'moderate', 'hard'],
  },
  directions: { type: String, required: true, maxLength: 1000 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
});

HikesSchema.virtual('url').get(function () {
  return '/hikes/' + this._id;
});

module.exports = mongoose.model('Hikes', HikesSchema);
