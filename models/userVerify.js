const Joi = require("joi");

const { Schema, model } = require("mongoose");

const userVerifySchema = Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  }
});

const joinUserVerifySchema = Joi.object({
  email: Joi.string().required()
});

const UserVerify = model("userVerify", userVerifySchema);

module.exports = { UserVerify, joinUserVerifySchema };
