require("dotenv").config();
const twilio = require("twilio");

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function sendWaterUsageReminder(to) {
  return client.messages.create({
    body: "Please send today's Water Usage Data.",
    from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
    to: `whatsapp:${to}`,
  });
}

function sendAcknowledgment(to, from) {
  return client.messages.create({
    body: "Thank you! Your data has been recorded.",
    from: from,
    to: to,
  });
}

module.exports = {
  sendWaterUsageReminder,
  sendAcknowledgment,
};
