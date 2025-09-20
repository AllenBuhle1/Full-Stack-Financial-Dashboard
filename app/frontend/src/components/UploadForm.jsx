import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUpload , uploadRefresh}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file to upload.');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/api/finances/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { newUsers, newRecords } = res.data;

      let msg = '';
      if (newUsers === 0 && newRecords === 0) {
        msg = 'Upload completed: No new users or records were added (all data already exists).';
      } else {
        msg = `Upload successful! ${newUsers} new user(s), ${newRecords} new record(s) added.`;
      }
      onUpload(msg);
      setFile(null); // Reset file input

    } catch (err) {
      console.error(err);
      alert('Upload failed. Please check your file format and try again.');
    } finally {
      setUploading(false);
    }
    uploadRefresh();
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Excel'}
      </button>
    </div>
  );
};

export default UploadForm;
