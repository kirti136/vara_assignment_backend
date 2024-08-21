require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Function to send the message to the user
function sendWaterUsageReminder() {
  client.messages
    .create({
      body: "Please send today's Water Usage Data.",
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      to: "whatsapp:+918669664848",
    })
    .then((message) => console.log("Reminder sent:", message.sid))
    .catch((err) => console.error("Error sending reminder:", err.message));
}

// Function to store data in Excel
function storeData(date, value) {
  const directoryPath = path.join(__dirname, "data");
  const filePath = path.join(directoryPath, "water-usage.xlsx");
  let workbook;
  let worksheet;

  // Check if the directory exists, and create it if it doesn't
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets["WaterUsage"];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Date", "Value"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "WaterUsage");
  }

  // Append new data
  const newRow = [date, value];
  XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });

  // Write back to the file
  XLSX.writeFile(workbook, filePath);
}

// Endpoint to handle incoming WhatsApp messages
app.post("/whatsapp", (req, res) => {
  const incomingMessage = req.body.Body;
  const incomingDate = new Date().toLocaleDateString();

  console.log("MESSAGES", incomingDate, incomingMessage);
  console.log(req.body);
  // Store the received data
  storeData(incomingDate, incomingMessage);

  // Send a response back to the user
  client.messages
    .create({
      body: "Thank you! Your data has been recorded.",
      from: req.body.To,
      to: req.body.From,
    })
    .then((message) => console.log("Acknowledgment sent:", message.sid))
    .catch((err) => console.error(err));

  res.sendStatus(200);
});

// Set an interval to send a reminder every 5 minutes
setInterval(sendWaterUsageReminder, 5 * 60 * 1000);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
