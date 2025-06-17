import React from 'react';

const FileUploader = ({ onFileParse }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;
      try {
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(content);
          onFileParse(json, 'npm');
        } else if (file.name.endsWith('.txt')) {
          onFileParse(content, 'pip');
        } else if (file.name.endsWith('.xml')) {
          onFileParse(content, 'maven');
        } else {
          alert('Unsupported file type');
        }
      } catch (err) {
        alert('Failed to parse file');
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="my-4">
      <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
        Choose File
        <input
          type="file"
          accept=".json,.txt,.xml"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUploader;
