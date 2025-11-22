import { useState } from "react";
import { Link } from "react-router-dom";

const availableFiles = [
  "Fynd-Wedjan17.json",
  "Bar S Demo Training Manual.json",
  "CMAB 8150054_TM (1).json",
  "1529459.json",
  "1529469.json"
];

export default function JSONUpload({ onLoad }) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileSelect(filename) {
    setLoading(true);
    try {
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.filename = filename; // Add filename to the data
      onLoad(data);
      setFileName(filename);
    } catch (err) {
      alert(`Failed to load ${filename}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-container">
      <h1>Demo JSON Viewer</h1>
      <p>Choose one of the parsed demo files to view:</p>

      <div className="file-list">
        {availableFiles.map(filename => (
          <button
            key={filename}
            className="file-button"
            onClick={() => handleFileSelect(filename)}
            disabled={loading}
          >
            {filename}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {fileName && <p className="filename">Loaded: {fileName}</p>}

      {fileName && (
        <Link to="/viewer" className="button">
          View Parsed Demo →
        </Link>
      )}
    </div>
  );
}
