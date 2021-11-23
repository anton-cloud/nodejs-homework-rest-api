// const sqMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY } = process.env;
// sqMail.setApiKey(SENDGRID_API_KEY); //+ ключ в обєкт

// const sendEmail = async data => {
//   try {
//     const email = { ...data, from: "a.sharudilo@meta.ua" };

//     const result = await sqMail.send(email);
//     console.log(result);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = sendEmail;
// ==========================================

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "a.sharudilo@meta.ua",
//     pass: process.env.EMAIL_PASSWORD
//   }
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async data => {
//   try {
//     const email = { ...data, from: "a.sharudilo@meta.ua" };
//     console.log(email);
//     const result = await transporter.sendMail(email);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// // };
// ==========================
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  try {
    const email = { ...data, from: "a.sharudylo@gmail.com" };
    const result = await sgMail.send(email);
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

// ==========================
module.exports = sendEmail;
