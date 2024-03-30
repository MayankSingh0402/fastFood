import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper";

const UpdatePhoneNumberModal = ({
  showModal,
  handleClose,
  fetchUserDetails,
}) => {
  const UserEmail = localStorage.getItem("userEmail");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleInputChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Backendurl}/api/auth/updatePhoneNumber`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          newPhoneNumber: newPhoneNumber,
        }),
      });
      const json = await response.json();
      if (json.success) {
        // Set success message after updating phone number
        toast.success(json.message);

        setTimeout(() => {
          fetchUserDetails();
          // Close the modal after updating phone number
          handleClose();
        }, 2000);
      } else {
        // Set error message if any error occurs while updating Address
        toast.error(json.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header
        // closeButton
        style={{ backgroundColor: "#EEF5FF", position: "relative" }}
      >
        <Modal.Title style={{ color: "black" }}>
          Update Phone Number
        </Modal.Title>
        <button
          className="close btn "
          style={{
            color: "white",
            position: "absolute",
            backgroundColor: "#FB641B",
            top: "10px",
            right: "10px",
          }}
          onClick={handleClose}
        >
          &times;
        </button>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#EEF5FF" }}>
        <Form onSubmit={handleUpdatePhoneNumber}>
          <Form.Group controlId="formNewPhoneNumber">
            <Form.Label style={{ color: "black" }}>New Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new phone number"
              value={newPhoneNumber}
              onChange={handleInputChange}
              style={{
                backgroundColor: "white",
                color: newPhoneNumber ? "black" : "inherit",
              }}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
            style={{ backgroundColor: "#152F55" }}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer></ToastContainer>
    </Modal>
  );
};

export default UpdatePhoneNumberModal;
