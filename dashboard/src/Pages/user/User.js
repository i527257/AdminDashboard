import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import EditUserRole from '../../Components/Edit-User-Role';
import './User.css';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You are not logged in.');
      return;
    }

    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/User/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        setErrorMessage('Failed to load user data. Please try again later.');
      }
    };

    fetchLoggedInUser();

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/User/getuser/${id}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditRoleClick = () => {
    setShowEditRoleModal(true);
  };

  const closeEditRoleModal = () => {
    setShowEditRoleModal(false);
  };

  const refreshUserData = () => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/User/getuser/${id}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  };

  if (errorMessage) {
    return <Alert variant="danger">{errorMessage}</Alert>;
  }

  if (!user || !loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="user-container mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <Card.Img
                variant="top"
                src={user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : 'default-profile.jpg'}
                alt={`${user.displayname}'s profile`}
                className="user-profile-picture mb-3"
              />
              <h4>{user.displayname}</h4>
              <p>{user.firstname} {user.lastname}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5>User Information</h5>
              <p><strong>Display Name:</strong> {user.displayname}</p>
              <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {loggedInUser.id !== user.id && (
                <Button variant="warning" onClick={handleEditRoleClick}>Edit Role</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditUserRole
        showModal={showEditRoleModal}
        closeModal={closeEditRoleModal}
        userId={user.id}
        refreshUserData={refreshUserData}
      />
    </Container>
  );
};

export default User;
