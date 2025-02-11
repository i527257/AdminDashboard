import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserRole = ({ showModal, closeModal, userId, refreshUserData }) => {
  const [role, setRole] = useState('User');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/User/GrantUserAdmin/${userId}`,
        { admin: role === 'Admin' }
      );
      setSuccessMessage('User role updated successfully!');
      refreshUserData();
      closeModal();
    } catch (error) {
      console.error('Error updating user role:', error);
      setErrorMessage('Failed to update the user role. Please try again.');
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        {successMessage && <div className="text-success">{successMessage}</div>}
        <Form>
          <Form.Group controlId="role">
            <Form.Label>Select Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>User</option>
              <option>Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserRole;
