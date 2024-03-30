import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper";

const UpdateAddressModal = ({ showModal, handleClose, fetchUserDetails }) => {
  const UserEmail = localStorage.getItem("userEmail");
  const [newAddress, setNewAddress] = useState("");

  const handleInputChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Backendurl}/api/auth/updateAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          newAddress: newAddress,
        }),
      });
      const json = await response.json();

      if (json.success) {
        // Set success message after updating Address
        toast.success(json.message);

        setTimeout(() => {
          // Fetch the updated user details
          fetchUserDetails();
          // Close the modal after updating Address
          handleClose();
        }, 1500);
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
        <Modal.Title style={{ color: "black" }}>Update Address</Modal.Title>
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
        <Form onSubmit={handleUpdateAddress}>
          <Form.Group controlId="formNewAddress">
            <Form.Label style={{ color: "black" }}>New Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new address"
              value={newAddress}
              onChange={handleInputChange}
              style={{
                backgroundColor: "white",
                color: newAddress ? "black" : "inherit",
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
            UPDATE
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer></ToastContainer>
    </Modal>
  );
};

export default UpdateAddressModal;
