import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [uploadMessage, setUploadMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [UploadFetchDataTrigger,setUploadFetchDataTrigger] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        if (res.data.length > 0 && !selectedUser) {
          setSelectedUser(res.data[0].user_id); // default first user
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [UploadFetchDataTrigger]);

  return (
    <div className="app-container">
      <h1>Ai Campus Financial Dashboard</h1>

      {/* Upload Excel */}
      <UploadForm onUpload={(msg) => setUploadMessage(msg)} uploadRefresh={()=> setUploadFetchDataTrigger(!UploadFetchDataTrigger)}/>
      {uploadMessage && (
        <div className="upload-message">
          <p>{uploadMessage}</p>
        </div>
      )}

      {/* User & Year Filter */}
      <div className="filter-container">
        <label>User:
        <select value={selectedUser || ''} onChange={e => setSelectedUser(e.target.value)}>
          {users.map(user => (
            <option key={user.user_id} value={user.user_id}>{user.name}</option>
          ))}
        </select>
        </label>
        
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>

      {/* Dashboard */}
      {selectedUser && year && (
        <Dashboard
          userId={selectedUser}
          year={year}
          key={`${selectedUser}-${year}-${refresh}`}
        />
      )}
    </div>
  );
}

export default App;
