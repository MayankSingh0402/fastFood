import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper.js";

export default function OtpLogin() {
  const [credentials, setCredentials] = useState({
    otp: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(credentials.otp)) {
      toast.error("Enter Valid Otp");
    } else if (credentials.otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    }

    const response = await fetch(`${Backendurl}/api/auth/otplogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: credentials.otp,
        email: localStorage.getItem("userEmail"),
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);

      toast.success(json.message);

      // after 2 second it will redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(json.message);
      // when login failed then remove the email from localstorage
      localStorage.removeItem("userEmail");
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
              <h1> Please Enter Your OTP Here </h1>
            </Card.Title>
            <Form
              onSubmit={handleSubmit}
              style={{
                "margin-top": "70px",
              }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="otp"
                  style={{ ...sharedInputStyles }}
                  placeholder=" Please Enter Your OTP Here"
                  value={credentials.otp}
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
          @media (max-width: 767px)and (max-height: 823px){
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
