
// import React, { useEffect, useState } from 'react';
// import apiRequest from '../../lib/apiRequest';
// import './AdminDashboard.scss';
// import Navbar from '../../components/navbar/Navbar';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsersAndPosts = async () => {
//       try {
//         const res = await apiRequest.get('/admin/users');
//         console.log("Fetched Users and Posts Data: ", res.data); // Log the data structure
//         setUsers(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to load users and posts:', err);
//         setError('Failed to load users and posts');
//         setLoading(false);
//       }
//     };

//     fetchUsersAndPosts();
//   }, []);

//   const handleApprove = async (postId) => {
//     try {
//       await apiRequest.post(`/admin/approve-post/${postId}`);
//       setUsers(users.map(user => ({
//         ...user,
//         posts: user.posts.map(post => 
//           post.id === postId ? { ...post, approved: true } : post
//         )
//       })));
//     } catch (err) {
//       setError('Failed to approve post');
//     }
//   };

//   const handleReject = async (postId) => {
//     try {
//       await apiRequest.post(`/admin/reject-post/${postId}`);
//       setUsers(users.map(user => ({
//         ...user,
//         posts: user.posts.filter(post => post.id !== postId)
//       })));
//     } catch (err) {
//       setError('Failed to reject post');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="admin-dashboard">
//       <Navbar />
//       <h1>Admin Dashboard</h1>
//       {users.map(user => (
//         <div key={user.id} className="user">
//           <h2>{user.username}</h2>
//           {user.posts.map(post => (
//             <div key={post.id} className="post">
//               <h3>{post.title}</h3>
//               <p>{post.address}</p>
//               <p>${post.price}</p>
//               <div className="post-details">
//                 <div className="images">
//                   {post.images && post.images.map((image, index) => (
//                     <img key={index} src={image} alt={`property ${index}`} />
//                   ))}
//                 </div>
//                 <div className="description">
//                   <p>{post.postDetail?.desc || 'No description available'}</p>
//                 </div>
//                 <div className="features">
//                   <p>Utilities: {post.postDetail?.utilities || 'N/A'}</p>
//                   <p>Pet Policy: {post.postDetail?.pet || 'N/A'}</p>
//                   <p>Income Policy: {post.postDetail?.income || 'N/A'}</p>
//                   <p>Size: {post.postDetail?.size || 'N/A'} sqft</p>
//                   <p>Bedrooms: {post.bedroom}</p>
//                   <p>Bathrooms: {post.bathroom}</p>
//                 </div>
//               </div>
//               <div className="actions">
//                 {!post.approved && (
//                   <>
//                     <button onClick={() => handleApprove(post.id)}>Approve</button>
//                     <button onClick={() => handleReject(post.id)}>Reject</button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;



import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import UserList from './userList';
import UserPosts from './UserPosts';
import './AdminDashboard2.scss';
import apiRequest from '../../lib/apiRequest';

function AdminDashboard() {
  const [view, setView] = useState(''); // view can be 'users' or 'posts'
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === 'users') {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await apiRequest.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Failed to load users');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiRequest.delete(`/admin/delete-user/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <h1>Admin Dashboard</h1>
      <p className="intro-paragraph">
        Welcome to the Admin Dashboard. Here, you can manage all the users and their posts on the platform.
        Use the buttons below to navigate through the dashboard and perform actions such as viewing all users, 
        approving or rejecting posts, and deleting users or posts. 
        This dashboard provides you with all the necessary tools to maintain and oversee the platform efficiently.
      </p>
      <div className="nav-buttons">
        <button onClick={() => handleViewChange('users')}>See All Users</button>
        <button onClick={() => handleViewChange('posts')}>See Users Posts</button>
      </div>
      {view === 'users' && <UserList users={users} onDeleteUser={handleDeleteUser} />}
      {view === 'posts' && <UserPosts />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AdminDashboard;










