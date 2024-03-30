import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Backendurl } from "../services/helper";
import { toast, ToastContainer } from "react-toastify";

const DeleteAccountModal = ({ showModal, handleClose }) => {
  let navigate = useNavigate();
  const UserEmail = localStorage.getItem("userEmail");
  const [password, setPassword] = useState("");

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Backendurl}/api/auth/deleteUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserEmail,
        password: password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      // Set success message
      toast.success("Account Deleted Successfully");

      // Clear all the data from localStorage after user deleted his/her account
      localStorage.clear();

      // after 1.5 second it will redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      // Set error message
      toast.error(json.message);
    }
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header
        style={{ backgroundColor: "#EEF5FF", position: "relative" }}
      >
        <Modal.Title style={{ color: "#ED1B19" }}>Delete Account</Modal.Title>
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
        <Form onSubmit={handleAccountDelete}>
          <Form.Group controlId="formDeleteAccount" className="mx-auto">
            <Form.Label style={{ color: "black" }} className="text-center">
              Are you sure you want to delete your account?
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleInputChange}
              style={{
                backgroundColor: "white",
                color: password ? "black" : "inherit",
              }}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 btn btn-danger mt-3"
            style={{ backgroundColor: "#ED1B19" }}
          >
            Delete
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer></ToastContainer>
    </Modal>
  );
};

export default DeleteAccountModal;
