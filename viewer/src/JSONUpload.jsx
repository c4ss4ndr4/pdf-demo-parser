const availableFiles = [
  "Fynd-Wedjan17.json",
  "Bar S Demo Training Manual.json",
  "CMAB 8150054_TM (1).json",
  "1529459.json",
  "1529469.json"
];

export default function JSONUpload({ onLoad }) {
  async function handleFileSelect(filename) {
    try {
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.filename = filename; // Add filename to the data
      data.collapsed = true; // Start collapsed
      onLoad(data);
    } catch (err) {
      alert(`Failed to load ${filename}: ${err.message}`);
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
          >
            {filename}
          </button>
        ))}
      </div>
    </div>
  );
}
