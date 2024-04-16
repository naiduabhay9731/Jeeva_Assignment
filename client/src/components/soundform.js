import React, { useState } from "react";
import "./soundform.css"; // Import CSS file

function Soundform() {
     // State variables to hold form data
  const [docName, setDocName] = useState("");
  const [patName, setPatName] = useState("");
  const [patAge, setPatAge] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [soundFile, setSoundFile] = useState(null);
  const [formDataEntries, setFormDataEntries] = useState([]);

  // Event handlers for input fields
  const hDocNameChange = (e) => {
    setDocName(e.target.value);
  };

  const hPatNameChange = (e) => {
    setPatName(e.target.value);
  };

  const hPatAgeChange = (e) => {
    setPatAge(e.target.value);
  };

  const hRecordDateChange = (e) => {
    setRecordDate(e.target.value);
  };

  const hSoundFileChange = (e) => {
    setSoundFile(e.target.files[0]);
  };
 // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
// Create FormData object to send form data to the server
    const formData2 = new FormData();

    formData2.append("doctorName", docName);
    formData2.append("patientName", patName);
    formData2.append("patientAge", patAge);
    formData2.append("recordDate", recordDate);
    formData2.append("soundFile", soundFile);
// Add new form data entry to the state
    const newEntry = {
      doctorName: docName,
      patientName: patName,
      patientAge: patAge,
      recordingDate: recordDate,
      soundFile: soundFile,
    };
    setFormDataEntries([...formDataEntries, newEntry]);

    // Clear form fields after submission
    setDocName("");
    setPatName("");
    setPatAge("");
    setRecordDate("");
    setSoundFile(null);
    // Submit form data to the server
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        body: formData2,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Jeeva Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor's Name:</label>
          <br />
          <input
            type="text"
            id="docName"
            name="docName"
            value={docName}
            onChange={hDocNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="patientName">Patient's Name:</label>
          <br />
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={patName}
            onChange={hPatNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="patientAge">Patient's Age:</label>
          <br />
          <input
            type="number"
            id="patientAge"
            name="patientAge"
            value={patAge}
            onChange={hPatAgeChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recordDate">Date of Sound Recording:</label>
          <br />
          <input
            type="date"
            id="recordDate"
            name="recordDate"
            value={recordDate}
            onChange={hRecordDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="soundFile">Upload Sound File:</label>
          <br />
          <input
            type="file"
            id="soundFile"
            name="soundFile"
            onChange={hSoundFileChange}
            accept=".mp3, .wav"
            required
          />
        </div>

        <input type="submit" value="Submit" className="submit-button" />
      </form>
      <div className="table-container">
        <h2>Patient Data</h2>
        <table>
          <thead>
            <tr>
              <th>Doctor's Name</th>
              <th>Patient's Name</th>
              <th>Patient's Age</th>
              <th>Date of Recording</th>
              <th>Audio</th>
            </tr>
          </thead>
          <tbody>
            {formDataEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.doctorName}</td>
                <td>{entry.patientName}</td>
                <td>{entry.patientAge}</td>
                <td>{entry.recordingDate}</td>
                <td>
                  {entry.soundFile && (
                    <audio controls>
                      <source
                        src={URL.createObjectURL(entry.soundFile)}
                        type={entry.soundFile.type}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Soundform;
