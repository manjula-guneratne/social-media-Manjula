const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [   // Testing it out
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ], //self reference??
  },
  {
    toJSON: {
      virtuals: true,
      pre: true
    },
    id: false
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create Pizza model
const User = model("User", UserSchema);

//export the User model
module.exports = User;
