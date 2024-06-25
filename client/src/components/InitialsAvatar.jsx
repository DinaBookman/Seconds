import React, { useState, useEffect } from 'react';
import './InitialsAvatar.css';

const getInitials = (name) => {
  const namesArray = name.split(' ');
  const initials = namesArray.map((n) => n[0]).join('');
  return initials;
};

const InitialsAvatar = ({ name, userId }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}/profile-image`)
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrl) {
          setImage(data.imageUrl);
        }
      });
  }, [userId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        // Save the image URL to the backend
        fetch(`http://localhost:8080/users/${userId}/profile-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: base64Image }),
        }).then(() => setImage(base64Image));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      {image ? <img src={image} alt="Profile" className="avatar-image" /> : getInitials(name)}
      <button className="edit-button" onClick={() => document.getElementById('uploadInput').click()}>
        ✎
      </button>
      <input
        id="uploadInput"
        type="file"
        accept="image/*"
        className="upload-input"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default InitialsAvatar;
