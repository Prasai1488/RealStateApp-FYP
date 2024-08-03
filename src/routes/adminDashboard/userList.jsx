import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import './UserList.scss';

function UserList({ onDeleteUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiRequest.get('/admin/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list">
      <h1>All Users</h1>
      {users.map(user => (
        <div key={user.id} className="user">
          <img src={user.avatar} alt={user.username} className="avatar" />
          <div className="user-details">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
          <button onClick={() => onDeleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
