// src/models/BookingRequest.js
const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  timeSlot: { type: String, required: true },
  note: { type: String },
  username: { type: String, required: true }
});

module.exports = mongoose.model('BookingRequest', BookingRequestSchema);
