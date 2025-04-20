import React from 'react';
import { FaFileImport, FaFileExport } from 'react-icons/fa'; // Import icons

const ProgressControl = ({ progress, setProgress }) => {

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'progress.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProgress = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = JSON.parse(e.target.result);
          setProgress(fileContent);
        } catch (error) {
          console.error("Error parsing the file:", error);
          // Handle the error appropriately (e.g., display an error message)
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <div>
      <h2>Import & Export</h2>
      <p>You can export or import your current progress using the buttons below:</p>
    <div className="progress-controls">
      
      <button onClick={exportProgress}><FaFileExport /> Export</button>
      <input type="file" id="import-file-input" accept=".json" onChange={importProgress} style={{ display: 'none' }} />
      <button id="import-progress-button" onClick={() => {
        document.getElementById('import-file-input').click();
      }}><FaFileImport /> Import</button>
    </div>
    </div>
      
  );
};

export default ProgressControl;