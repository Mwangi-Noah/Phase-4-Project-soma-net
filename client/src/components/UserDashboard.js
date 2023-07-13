import React, { useState, useEffect } from 'react';
import './dashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/me', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user data');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfilePictureUpload = async () => {
    if (profilePicture) {
      try {
        const formData = new FormData();
        formData.append('profile_picture', profilePicture);

        const response = await fetch('/users/me', {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          // Refresh user data after successful profile picture upload
          fetchUser();
          setProfilePicture(null);
        } else {
          console.error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div className="container loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      {user && (
        <>
          <div className="profile-picture-container">
            <label className="profile-picture-label" htmlFor="profilePicture">Profile Picture:</label>
            <input className="profile-picture-input" type="file" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />
            <button className="profile-picture-upload-button" onClick={handleProfilePictureUpload}>Upload</button>
          </div>
          <div className="user-info">
            <label className="user-info-label">Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="user-info">
            <label className="user-info-label">Email:</label>
            <span>{user.email}</span>
          </div>
          {/* Add other user information fields as needed */}
        </>
      )}
    </div>
  );
};

export default UserDashboard;