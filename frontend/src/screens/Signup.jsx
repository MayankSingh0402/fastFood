import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Backendurl } from "../services/helper.js";

// https://getbootstrap.com/docs/5.0/forms/overview/
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };

    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });

    let [lat, long] = latlong;
    console.log(lat, long);

    const response = await fetch(`${Backendurl}/api/auth/getlocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({ latlong: { lat, long } }),
    });

    const { location } = await response.json();
    console.log(location);
    setCredentials({ ...credentials, [e.target.name]: location });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? !credentials[name] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("confirmPassword", credentials.confirmPassword);
    formData.append("location", credentials.location);
    formData.append("img", selectedImage);
    try {
      const response = await fetch(`${Backendurl}/api/auth/createuser`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        toast.error(json.message);
      } else {
        toast.success(json.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
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
          className=" my-4 bg-glass"
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
              <h1>Create an Account</h1>
            </Card.Title>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  type="password"
                  name="password"
                  style={{ ...sharedInputStyles }}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  style={{ ...sharedInputStyles }}
                  placeholder="Confirm Password"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="location"
                  style={{ ...sharedInputStyles }}
                  placeholder="Click Below to get Current Location"
                  value={credentials.location}
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-between mt-1">
                  {/* <input type="file" name="profileimage" /> */}
                  <Link
                    className="text-primary"
                    onClick={handleClick}
                    name="location"
                  >
                    Fetch Current Location
                  </Link>
                </div>

                <div
                  className="mt-1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {selectedImage && (
                    <div
                      className="rounded-circle"
                      style={{ marginRight: "10px" }}
                    >
                      <img
                        className="rounded-circle"
                        alt="not found"
                        width="100px" // Adjust the width as needed
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                </div>
              </Form.Group>
              <div className="">
                <Button
                  className="w-100"
                  type="submit"
                  style={{ backgroundColor: "#152F55" }}
                >
                  Register
                </Button>
              </div>
              <div className="d-flex justify-content-center mt-4 ">
                <Link to="/login" className="text-black text-decoration-none">
                  Already a User?{" "}
                  <span className="text-danger text-decoration-underline">
                    LOGIN
                  </span>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <style>
        {`

        /* Common Style for all the devices */
        .card{
           margin:0 auto;
            width:90%;
        }

          /* Media query for desktops */
        @media(min-width:992px){
          .card{
            width:50%;
          }
        }

         /* Media query for tablets */
        @media(min-width:768px) and (max-width:991px){
          .card{
            width:70%;
          }
        }

      /* Media query for phones */
        @media(max-width:767px){
          .card{
            width:90%;
          }
        }
      `}
      </style>

      <ToastContainer></ToastContainer>
    </div>
  );
}
