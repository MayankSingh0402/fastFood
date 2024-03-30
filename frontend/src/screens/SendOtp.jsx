import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Footer from "../components/Footer";
import Navbar from "../components/Navbar.jsx";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper.js";

export default function SendOtp() {
  const [credentials, setCredentials] = useState({
    email: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Backendurl}/api/auth/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
      }),
    });
    const json = await response.json();
    if (json.success) {
      toast.success(json.message);
      localStorage.setItem("userEmail", credentials.email);

      // after 2 second it will redirect to home page
      setTimeout(() => {
        navigate("/otplogin");
      }, 2000);
    } else {
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
      <Navbar> </Navbar>
      <Container>
        <Card
          className=" my-5 bg-glass"
          style={{
            border: "none",
            borderRadius: "15px",
          }}
        >
          <Card.Body
            className="p-5 form-background"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
            }}
          >
            <Card.Title className="text-center mb-4 text-primary">
              <h1>Welcome Back, Log In</h1>
            </Card.Title>
            <Form
              onSubmit={handleSubmit}
              style={{
                "margin-top": "70px",
              }}
            >
              <label className="fs-5" style={{ color: "black" }}>
                Email
              </label>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  style={{ ...sharedInputStyles }}
                  placeholder="Enter Your Email Address"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="mt-4">
                <Button
                  className="w-100 "
                  style={{ backgroundColor: "#152F55" }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>

              <div className=" d-flex justify-content-center mt-4 ">
                <Link
                  to="/createuser"
                  className="text-black text-decoration-none"
                >
                  Don't Have an Account?{" "}
                  <span className="text-danger text-decoration-underline ">
                    Register
                  </span>
                </Link>
              </div>
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
          @media (max-width: 767px) (max-height: 823px) {
            .card {
              width: 90%; /* Adjust the width for phones */
            }
          }
          
        `}
      </style>

      <ToastContainer />
    </div>
  );
}
