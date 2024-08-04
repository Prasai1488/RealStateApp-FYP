import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import './UserList.scss';

function UserList({ onDeleteUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await apiRequest.get(`/admin/users?page=${pageNumber}&limit=5`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Failed to load users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

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
      <div className="pagination">
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
