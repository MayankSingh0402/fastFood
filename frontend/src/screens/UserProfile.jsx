import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import UpdatePhoneNumberModal from "../Modals/UpdatePhoneNumberModal";
import UpdateAddressModal from "../Modals/UpdateAddressModal";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import { Backendurl } from "../services/helper.js";

export default function UserProfile() {
  // State variables for user name and address
  const [credentials, setCredentials] = useState({
    userName: "",
    userAddress: "",
    userPhoneNumber: "",
    userImage: null,
  });

  // Retrieve user Email from localStorage
  const userEmail = localStorage.getItem("userEmail");
  // let navigate = useNavigate();

  //  set error message when error Occour
  const [error, setError] = useState(null);

  // State variables for modal visibility and for updated phone number and address
  const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // Functions to handle modal visibility
  const handleShowUpdatePhoneModal = () => setShowUpdatePhoneModal(true);
  const handleClosePhoneModal = () => setShowUpdatePhoneModal(false);
  const handleShowAddressModal = () => setShowAddressModal(true);
  const handleCloseAddressModal = () => setShowAddressModal(false);
  const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const handleCloseDeleteAccountModal = () => setShowDeleteAccountModal(false);

  // fetch the user details from the database
  const getUserDetails = async () => {
    try {
      const response = await fetch(`${Backendurl}/api/auth/getUserDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      const json = await response.json();
      if (json.success) {
        setCredentials({
          userName: json.userName,
          userAddress: json.userAddress,
          userPhoneNumber: json.userPhoneNumber,
          userImage: json.userImage,
        });
        console.log(json.userImage);
        localStorage.setItem("userName", json.userName);
        // console.log(localStorage.getItem("userName"));
      } else {
        // Set error message
        setError(json.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Call getUserDetails directly when component mounts
    getUserDetails();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Styles for profile title and user occupation
  const titleStyle = {
    color: "black",
  };

  const textStyle = {
    color: "#CA108A",
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1505935428862-770b6f24f629?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vZHx8fHx8fDE3MDU2MDQwMzU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900")`,
        filter: "brightness(100%)",
        height: "100vh",
      }}
    >
      <Navbar />
      <Container>
        <Card className="mb-3 my-5" style={{ borderRadius: ".5rem" }}>
          <Row className="g-0">
            <Col
              md="4"
              className="gradient-custom text-center text-white"
              style={{
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem",
              }}
            >
              {credentials.userImage ? (
                <div>
                  <Card.Img
                    src={`data:${credentials.userImage.contentType};base64,${credentials.userImage.data}`}
                    alt="Avatar"
                    className="my-5 rounded-circle"
                    style={{ width: "80px" }}
                  />
                </div>
              ) : (
                <div>
                  <Card.Img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                  />
                </div>
              )}

              <Card.Title style={titleStyle}>
                {credentials.userName && credentials.userName.toUpperCase()}
              </Card.Title>
              <Card.Text style={textStyle}>
                Software Engineer
                <i
                  className="far fa-edit mb-5"
                  style={{
                    fontSize: "14px",
                  }}
                ></i>
              </Card.Text>
            </Col>
            <Col md="8">
              <Card.Body className="p-4">
                <Card.Title as="h6">Information</Card.Title>
                <hr className="mt-0 mb-4" />
                <Row className="pt-1">
                  <Col size="6" className="mb-3">
                    <Card.Title as="h6">Email</Card.Title>
                    <Card.Text className="text-muted">{userEmail}</Card.Text>
                  </Col>
                  <Col size="6" className="mb-3">
                    <Card.Title as="h6">Phone</Card.Title>
                    <Card.Text className="text-muted">
                      {credentials.userPhoneNumber}
                      <button
                        className="btn"
                        onClick={handleShowUpdatePhoneModal}
                      >
                        <i
                          className="far fa-edit "
                          style={{
                            fontSize: "14px",
                          }}
                        ></i>
                      </button>
                    </Card.Text>
                  </Col>
                </Row>
                <hr className="mt-0 mb-4" />
                <Row className="pt-1">
                  <Col size="3" className="mb-3">
                    <Card.Title as="h6">Address</Card.Title>
                    <Card.Text className="text-muted">
                      {credentials.userAddress}
                      <button className="btn" onClick={handleShowAddressModal}>
                        <i
                          className="far fa-edit"
                          style={{
                            fontSize: "14px",
                          }}
                        ></i>
                      </button>
                    </Card.Text>
                  </Col>
                  <Col size="3" className="">
                    {/* <Card> */}
                    <Button
                      className="btn btn-danger  text-white"
                      style={{ backgroundColor: "#ED1B19" }}
                      onClick={handleShowDeleteAccountModal}
                    >
                      Delete Account
                    </Button>
                    {/* </Card> */}

                    {/* Display error messages when error Occours */}
                    {error && <div className="text-danger">{error}</div>}
                  </Col>
                </Row>

                <div className="d-flex justify-content-start">
                  <Link to="">
                    <i className="fab fa-facebook me-3"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-twitter me-3"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-instagram me-3"></i>
                  </Link>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>

      <UpdatePhoneNumberModal
        showModal={showUpdatePhoneModal}
        handleClose={handleClosePhoneModal}
        fetchUserDetails={getUserDetails}
      />
      <UpdateAddressModal
        showModal={showAddressModal}
        handleClose={handleCloseAddressModal}
        fetchUserDetails={getUserDetails}
      />
      <DeleteAccountModal
        showModal={showDeleteAccountModal}
        handleClose={handleCloseDeleteAccountModal}
      />

      {/* Css for user Profile  */}
      <style>
        {`
          /* Media Query for all types of devices */
          .card {
            margin: 0 auto;
            width: 90%;
          }

          @media (min-width: 992px) {
            /* Desktop devices */
            .card {
              width: 50%;
            }
          }

          @media (min-width: 768px) and (max-width: 991px) {
            /* Tablets */
            .card {
              width: 70%;
            }
          }

          @media (max-width: 767px) {
            /* Phones */
            .card {
              width: 90%;
            }
          }        
        .gradient-custom {
          /* fallback for old browsers */
          background: #f6d365;

          /* Chrome 10-25, Safari 5.1-6 */
          background: -webkit-linear-gradient(
            to right bottom,
            rgba(246, 211, 101, 1),
            rgba(253, 160, 133, 1)
          );

          /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          background: linear-gradient(
            to right bottom,
            rgba(246, 211, 101, 1),
            rgba(253, 160, 133, 1)
          );
        }

        /* Additional styling for card */
        .card {
          border: none;
        }

        /* Adjust styling for icons */
        i.far.fa-edit,
        i.fab.fa-facebook,
        i.fab.fa-twitter,
        i.fab.fa-instagram {
          font-size: 1.5rem;
          color: white;
          margin-right: 1rem;
        }

        /* Adjust styling for Card.Title and Card.Text */
        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .card-text {
          font-size: 0.9rem;
          color: #6c757d; /* Bootstrap's muted text color */
        }

        /* Adjust styling for Card.Img */
        .card-img {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;

          /* media Query for all  type of devices */
          .card{
            margin:0 auto;
            width: 90%;
          }

          @media(min-width:992px){
            .card{
              width:50%;
            }
          }

          @media(min-width:768px) and (max-width:991px){
            .card{
              width:70%;
            }
          }

          @media(max-width:767px){
            .card{
              width:90%;
            }
          }

`}
      </style>
    </div>
  );
}
