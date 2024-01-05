const sgMail = require("@sendgrid/mail");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  text,
  attachments,
}) => {
  try {
    const from = sender || "contact@htech-cloud.com";

    const msg = {
      to: recipient,
      from: from,
      subject,
      html: html,
      text: text,
      attachments,
    };

    return sgMail.send(msg);
  } catch (err) {
    console.error("service/mailer", err);
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return new Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
