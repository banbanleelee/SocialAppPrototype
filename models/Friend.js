const { Schema, Types } = require("mongoose");

const friendSchema = new Schema({
  friendId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = friendSchema;