const { Router } = require("express");
const { sendAcknowledgment } = require("../services/twilioService");
const { storeData } = require("../services/dataService");

const router = Router();

router.post("/whatsapp", (req, res) => {
  const incomingMessage = req.body.Body;
  const incomingDate = new Date().toLocaleDateString();

  console.log("MESSAGES", incomingDate, incomingMessage);
  // console.log(req.body);

  storeData(incomingDate, incomingMessage);

  sendAcknowledgment(req.body.From, req.body.To)
    .then((message) => console.log("Acknowledgment sent:", message.sid))
    .catch((err) => console.error(err));

  res.sendStatus(200);
});

module.exports = router;
