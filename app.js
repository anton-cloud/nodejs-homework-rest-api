const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

// ===========================================================
// const sqMail = require("@sendgrid/mail");
// require("dotenv").config();
// const { SENDGRID_API_KEY } = process.env;
// sqMail.setApiKey(SENDGRID_API_KEY); //+ ключ в обєкт

// const email = {
//   to: "a.sharudylo@gmail.com", //кому
//   from: "a.sharudilo@meta.ua ", //від кого
//   subject: "Test email", //тема
//   html: `<p>inform_1<p>
//          <p>inform_2<p>` //текст
// };

// sqMail
//   .send(email)
//   .then(() => console.log("success"))
//   .catch(error => console.log(error.code));
// ===========================================================
// const nodemailer = require("nodemailer");
// //настройки SMTP
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

// transporter
//   .sendMail(email)
//   .then(() => console.log("email ok"))
//   .catch(error => console.log(error.message));
// ===========================================================
module.exports = app;
