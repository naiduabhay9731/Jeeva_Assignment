const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const mongoserver = process.env.mongo3 + "jeeva";
mongoose.connect(mongoserver);

// Define mongoose schema for Patient Data
const recordSchema = new mongoose.Schema({
  docName: String,
  patName: String,
  patAge: Number,
  date: Date,
  fileUrl: String,
});

// Create mongoose model
const NFeed = mongoose.model("NFeed", recordSchema);

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

// POST route for Storing Patient  Data.
app.post("/", upload.single('soundFile'),async (req, res) => {
  try {

    // Construct file path
   const filePath = "uploads/" + req.file.filename;
    const newsFeed = new NFeed({
      docName: req.body.doctorName,
      patName: req.body.patientName,
      patAge: req.body.patientAge,
      date: req.body.recordDate,
      fileUrl: req.file ? filePath : null,
      // Store the file path if available
    });
    console.log(newsFeed);
    // Save the patient data feed to database
    await newsFeed.save();

    res.status(201).send("Patient data stored created successfully");
  } catch (error) {
    console.error("Error storing Patient data :", error);
    res.status(500).send("Internal server error");
  }
});

// GET route for fetching all news feeds
app.get("/", async (req, res) => {
  try {
    const data = await NFeed.find({});
    res.send(data);
  } catch (error) {
    console.error("Error finding news feed:", error);
    res.status(500).send("Internal server error");
  }
});



// Define port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => console.log("Server is running on port " + PORT));
