const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: String,
  
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor' } 
});

module.exports = mongoose.model("students", StudentSchema);
