import { useState, useEffect } from "react";
import Viewer from "./Viewer";

const availableFiles = [
  "Fynd-Wedjan17.json",
  "Bar S Demo Training Manual.json",
  "CMAB 8150054_TM (1).json",
  "1529459.json",
  "1529469.json"
];

function App() {
  const [loadedFiles, setLoadedFiles] = useState([]);

  useEffect(() => {
    async function loadAllFiles() {
      const loadedData = await Promise.all(
        availableFiles.map(async (filename) => {
          try {
            const response = await fetch(`/data/${filename}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return { ...data, filename, collapsed: true };
          } catch (error) {
            console.error(`Failed to load ${filename}:`, error);
            return null;
          }
        })
      );

      // Filter out failed loads and set the loaded files
      setLoadedFiles(loadedData.filter(Boolean));
    }

    loadAllFiles();
  }, []);

  const toggleExpanded = (filename) => {
    setLoadedFiles(prev =>
      prev.map(file =>
        file.filename === filename
          ? { ...file, collapsed: !file.collapsed }
          : file
      )
    );
  };

  return (
    <div className="app">
      <div className="upload-container">
        <h1>Demo JSON Viewer</h1>
        <p>Click on any file below to expand and view its contents:</p>
      </div>

      <div className="loaded-files">
        {loadedFiles.map(file => (
          <div key={file.filename} className="file-accordion">
            <button
              className="accordion-toggle"
              onClick={() => toggleExpanded(file.filename)}
            >
              {file.filename} {file.collapsed ? '▶' : '▼'}
            </button>
            {!file.collapsed && <Viewer data={file} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
