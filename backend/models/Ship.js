const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a ship name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  imo: {
    type: String,
    unique: true,
    required: [true, 'Please add an IMO number'],
    match: [/^[0-9]{7}$/, 'Please add a valid IMO number (7 digits)']
  },
  type: {
    type: String,
    required: [true, 'Please add a ship type']
  },
  flag: {
    type: String,
    required: [true, 'Please add a flag country']
  },
  yearBuilt: {
    type: Number,
    required: [true, 'Please add the year built']
  },
  grossTonnage: {
    type: Number,
    required: [true, 'Please add gross tonnage']
  },
  deadWeight: {
    type: Number,
    required: [true, 'Please add deadweight tonnage']
  },
  length: {
    type: Number,
    required: [true, 'Please add length in meters']
  },
  beam: {
    type: Number,
    required: [true, 'Please add beam in meters']
  },
  owner: {
    type: String,
    required: [true, 'Please add the owner']
  },
  operator: {
    type: String,
    default: 'Same as owner'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Laid Up', 'Lost', 'Broken Up'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ship', ShipSchema);