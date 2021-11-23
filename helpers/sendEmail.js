const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  try {
    const email = { ...data, from: EMAIL_FROM };
    const result = await sgMail.send(email);
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
