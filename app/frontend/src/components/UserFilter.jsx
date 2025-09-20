import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFilter = ({ selectedUser, onChange }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <select value={selectedUser} onChange={e => onChange(e.target.value)}>
      <option value="">Select User</option>
      {users.map(user => (
        <option key={user.user_id} value={user.user_id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default UserFilter;
