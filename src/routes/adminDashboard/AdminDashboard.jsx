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
//         setUsers(res.data);
//         setLoading(false);
//       } catch (err) {
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
//               <p>{post.price}</p>
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


import React, { useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import './AdminDashboard.scss';
import Navbar from '../../components/navbar/Navbar';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const res = await apiRequest.get('/admin/users');
        console.log("Fetched Users and Posts Data: ", res.data); // Log the data structure
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load users and posts:', err);
        setError('Failed to load users and posts');
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      await apiRequest.post(`/admin/approve-post/${postId}`);
      setUsers(users.map(user => ({
        ...user,
        posts: user.posts.map(post => 
          post.id === postId ? { ...post, approved: true } : post
        )
      })));
    } catch (err) {
      setError('Failed to approve post');
    }
  };

  const handleReject = async (postId) => {
    try {
      await apiRequest.post(`/admin/reject-post/${postId}`);
      setUsers(users.map(user => ({
        ...user,
        posts: user.posts.filter(post => post.id !== postId)
      })));
    } catch (err) {
      setError('Failed to reject post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <Navbar />
      <h1>Admin Dashboard</h1>
      {users.map(user => (
        <div key={user.id} className="user">
          <h2>{user.username}</h2>
          {user.posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.address}</p>
              <p>${post.price}</p>
              <div className="post-details">
                <div className="images">
                  {post.images && post.images.map((image, index) => (
                    <img key={index} src={image} alt={`property ${index}`} />
                  ))}
                </div>
                <div className="description">
                  <p>{post.postDetail?.desc || 'No description available'}</p>
                </div>
                <div className="features">
                  <p>Utilities: {post.postDetail?.utilities || 'N/A'}</p>
                  <p>Pet Policy: {post.postDetail?.pet || 'N/A'}</p>
                  <p>Income Policy: {post.postDetail?.income || 'N/A'}</p>
                  <p>Size: {post.postDetail?.size || 'N/A'} sqft</p>
                  <p>Bedrooms: {post.bedroom}</p>
                  <p>Bathrooms: {post.bathroom}</p>
                </div>
              </div>
              <div className="actions">
                {!post.approved && (
                  <>
                    <button onClick={() => handleApprove(post.id)}>Approve</button>
                    <button onClick={() => handleReject(post.id)}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;















