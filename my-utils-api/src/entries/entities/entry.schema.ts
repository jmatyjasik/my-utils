import * as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  name: String,
  data: String
},
{ timestamps: true });