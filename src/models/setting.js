const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingSchema = new Schema({
  allow_update_link_submission: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
