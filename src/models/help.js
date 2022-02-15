const mongoose = require('mongoose');

const { Schema } = mongoose;

const helpSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  processing_status: {
    type: String,
    required: true,
    enum: ['pending', 'complete', 'cancel'],
    default: 'pending',
  },
  reply_by_admin: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Help = mongoose.model('Help', helpSchema);
module.exports = Help;
