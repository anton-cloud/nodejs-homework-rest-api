const Joi = require("joi");

const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String
    },
    verify: {
      type: Boolean,
      default: false
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"]
    }
  },
  { versionKey: false, timestamps: true }
);

const joinUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  avatarURL: Joi.string()
});

const User = model("user", userSchema);

module.exports = { User, joinUserSchema };
