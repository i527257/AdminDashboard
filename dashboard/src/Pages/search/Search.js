import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Image } from 'react-bootstrap'; 
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchUsers(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchUsers = async (term) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/User/users?search=${term}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Error fetching users. Please try again later.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="search-container">
      {/* Search input with Bootstrap InputGroup */}
      <input
        type="text"
        placeholder="Search users by displayname..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Display error message if there's any */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* User list with ListGroup */}
      <ListGroup className="user-list">
        {users.map((user) => (
          <ListGroup.Item
            key={user.id}
            className="user-item"
            onClick={() => handleUserClick(user.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="user-content">
              {/* Profile Picture on Left */}
              <Image
                src={user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : 'default-profile.jpg'}
                alt={`${user.displayname}'s profile`}
                className="user-profile-picture"
                roundedCircle
              />
              {/* Display Name on Right */}
              <span className="user-displayname">{user.displayname}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Search;
