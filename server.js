const express = require("express");
const routes = require("./routes");
const { sendWaterUsageReminder } = require("./services/twilioService");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes.whatsappRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Vara" });
});

// Set an interval to send a reminder every 5 minutes
setInterval(
  () =>
    sendWaterUsageReminder("+918669664848")
      .then((message) => console.log("Reminder sent:", message.sid))
      .catch((err) => console.error("Error sending reminder:", err.message)),
  10 * 1000
);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
