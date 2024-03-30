import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper";

export default function Feedback() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  let navigate = useNavigate();

  const AuthToken = localStorage.getItem("authToken");

  const ContactFormHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`${Backendurl}/api/auth/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        feedback: credentials.feedback,
      }),
    });
    const json = await responce.json();
    if (json.success) {
      // Set success message
      toast.success(json.message);

      // after 2 second it will redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      // Set error message
      toast.error(json.message);
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const sharedInputStyles = {
    backgroundColor: "white",
    color: "#2a2e33",
    border: "1px solid #222222",
    borderRadius: "8px",
  };

  return (
    <div>
      <Navbar></Navbar>

      <Container>
        <Card
          className=" my-5 bg-glass"
          style={{
            border: "none",
            borderRadius: "15px",
          }}
        >
          <Card.Body
            className="p-5 form-background" // p-5 is the space for outer area
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
            }}
          >
            <Card.Title className="text-center mb-4 text-primary">
              <h1>Feedback Form</h1>
            </Card.Title>
            <Form onSubmit={ContactFormHandler}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  style={{ ...sharedInputStyles }}
                  placeholder="Name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  style={{ ...sharedInputStyles }}
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea" // This makes it a textarea
                  rows={3} // You can adjust the number of rows as needed
                  name="feedback"
                  style={{ ...sharedInputStyles }}
                  placeholder="Enter Your Feedback here"
                  value={credentials.feedback}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="mt-4">
                <Button
                  className="w-100"
                  style={{ backgroundColor: "#152F55" }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>

              {!AuthToken && (
                <div className="d-flex justify-content-center mt-4 ">
                  <Link
                    to="/createuser"
                    className="text-black text-decoration-none"
                  >
                    Don't Have an Account?{" "}
                    <span className="text-danger">Register</span>
                  </Link>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <style>
        {`
          /* Common styles for all devices */
          .card {
            margin: 0 auto; /* Center the card */
            width: 90%; /* Adjust the width as needed */
          }

          /* Media query for desktops */
          @media (min-width: 992px) {
            .card {
              width: 50%; /* Adjust the width for desktops */
            }
          }

          /* Media query for tablets */
          @media (min-width: 768px) and (max-width: 991px) {
            .card {
              width: 70%; /* Adjust the width for tablets */
            }
          }

          /* Media query for phones */
          @media (max-width: 767px) and (max-height: 823px){
            .card {
              width: 90%; /* Adjust the width for phones */
            }
          }

        `}
      </style>
      <ToastContainer></ToastContainer>
    </div>
  );
}
