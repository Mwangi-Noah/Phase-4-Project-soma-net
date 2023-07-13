import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users/me', {
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

        const response = await fetch('/api/users/me', {
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
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>User Dashboard</h2>
      {user && (
        <>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />
            <button onClick={handleProfilePictureUpload}>Upload</button>
          </div>
          <div>
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          {/* Add other user information fields as needed */}
        </>
      )}
    </Container>
  );
};

export default UserDashboard;