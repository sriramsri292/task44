const mongoose = require("mongoose");
const { Schema } = mongoose;

const MentorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: String,
 
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] // Array to store student references
});

module.exports = mongoose.model("mentors", MentorSchema);
