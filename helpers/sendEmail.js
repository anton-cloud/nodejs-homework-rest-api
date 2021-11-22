const sqMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
sqMail.setApiKey(SENDGRID_API_KEY); //+ ключ в обєкт

const sendEmail = async data => {
  try {
    const email = { ...data, from: "a.sharudylo@gmail.com" };
    const result = await sqMail.send(email);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
