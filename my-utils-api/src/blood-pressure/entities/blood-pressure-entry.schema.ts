import * as mongoose from 'mongoose';

const ARMS = ['left', 'right'];
const POSITIONS = ['sit', 'lie'];

export const BloodPressureEntrySchema = new mongoose.Schema({
  systolic: Number,
  diastolic: Number,
  pulse: String,
  testDate: Date,
  arm: { type: String, enum: ARMS },
  position: { type: String, enum: POSITIONS },
  comments: String
},
{ timestamps: true });