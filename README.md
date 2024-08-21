
# Vara Assignment Backend

This is the backend API for the Vara Assignment. It collects water usage data via WhatsApp using Twilio, stores the data in an Excel file, and sends periodic reminders to users. The project is built with Node.js, Express, Twilio, ngrok and XLSX for Excel file handling.

## Demo Video 

 - [Demo Video](https://drive.google.com/file/d/1cPKpavF3BU58YvwYd_rWFWJ39Ig0unfx/view?usp=sharing)

## Run Locally

Clone the project

```bash
  git clone https://github.com/kirti136/vara_assignment_backend.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start or npm start
```

Expose the server using ngrok (also update the forwarding URL in the Twilio console sandbox configuration)

```bash
  ngrok http 3000
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`PORT`
`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`
`TWILIO_PHONE_NUMBER`


## API Reference

### WHATSAPP
#### Receive and store water usage data
```http
POST /whatsapp
```

## SERVICES

- **Twilio**: Used to send and receive WhatsApp messages.
- **XLSX**: Used to manage the Excel sheets where water usage data is stored.
- **ngrok**: Used to expose the local server to the internet for receiving WhatsApp messages.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Minimalist web framework for Node.js.
- **Twilio**: Communication platform for sending and receiving messages.
- **XLSX**: Library for reading and writing Excel files.
- **ngrok**: Tool to expose the local server to the internet.
- **dotenv**: Loads environment variables from a .env file.

## Folder Structure

vara_assignment_backend/

│ 

├── data/
 
│   └── water-usage.xlsx  # Stores data

|
 
├── services/
 
│   ├── twilioService.js  # Handles Twilio communication
 
│   └── dataService.js    # Manages data storage in Excel sheets
 
│
 
├── routes/

│   ├── index.js          # Main router file that combines all routes 
 
│   └── whatsapp.js       # Route handling WhatsApp messages
 
│
 
├── .env                   # Environment variables
 
├── server.js              # Main server file
 
└── package.json           # Project dependencies and scripts
 
 
