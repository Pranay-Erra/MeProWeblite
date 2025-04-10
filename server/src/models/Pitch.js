const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
  fileName: String,
  category: String,
  note: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pitch', pitchSchema);
