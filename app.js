const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path"); // Import path module
const app = express();
require('./config/database');
const router = require('./Router/router');
const cors = require("cors");

// dotenv.config({ path: "./.env" });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', router);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is Running Port No ${PORT}`);
});
