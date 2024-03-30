import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NoOrderMessage from "../components/NoOrderMessage";
import { Backendurl } from "../services/helper";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});
  const [orderDate, setOrderDate] = useState("");

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch(`${Backendurl}/api/auth/myOrderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const cardDataStyle = {
    color: "#161A1F",
    fontWeight: "bold",
  };

  return (
    <div
      className="h-100 h-custom"
      style={{ backgroundColor: "", filter: "brightness(100%)" }}
    >
      <div>
        <Navbar />
      </div>
      <div className="text-center fs-1 mt-4 mb-0 " style={{ ...cardDataStyle }}>
        Past Orders
      </div>
      <div className="container text-color">
        {Object.keys(orderData).length !== 0 ? (
          orderData.orderData.order_data.reverse().map((order, index) => (
            <div key={index}>
              <section
                className="h-100 gradient-custom"
                style={{ backgroundColor: "#eee" }}
              >
                <MDBContainer className="py-5 h-100 ">
                  <MDBRow className="justify-content-center align-items-center h-100 ">
                    <MDBCol lg="10" xl="8">
                      <MDBCard
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <MDBCardHeader className="px-4 py-5">
                          <MDBTypography tag="h5" className="text-muted mb-0">
                            Thanks for your Order,{" "}
                            <span style={{ color: "#a8729a" }}>Anna</span>!
                          </MDBTypography>
                        </MDBCardHeader>
                        <MDBCardBody className="p-4">
                          {order.map((arrayData) => (
                            <MDBCard
                              key={arrayData.id}
                              className="shadow-0 border mb-4 bg-white"
                            >
                              <MDBCardBody>
                                <MDBRow>
                                  <MDBCol md="2">
                                    <MDBCardImage
                                      src={arrayData.img}
                                      fluid
                                      alt="Phone"
                                    />
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0">
                                      {arrayData.name}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      {arrayData.size}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      Capacity: 64GB
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      {arrayData.qty}
                                    </p>
                                  </MDBCol>
                                  <MDBCol
                                    md="2"
                                    className="text-center d-flex justify-content-center align-items-center"
                                  >
                                    <p className="text-muted mb-0 small">
                                      {arrayData.price}
                                    </p>
                                  </MDBCol>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCard>
                          ))}
                        </MDBCardBody>
                        <div>
                          <hr
                            className="mb-4"
                            style={{
                              backgroundColor: "#e0e0e0",
                              opacity: 1,
                            }}
                          />
                          <MDBRow className="align-items-center">
                            <MDBCol md="2">
                              <p className="text-muted mb-0 small">
                                Track Order
                              </p>
                            </MDBCol>
                            <MDBCol md="10">
                              <MDBProgress
                                style={{
                                  height: "6px",
                                  borderRadius: "16px",
                                }}
                              >
                                <MDBProgressBar
                                  style={{
                                    borderRadius: "16px",
                                    backgroundColor: "#a8729a",
                                  }}
                                  width={65}
                                  valuemin={0}
                                  valuemax={100}
                                />
                              </MDBProgress>
                              <div className="d-flex justify-content-around mb-1">
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Out for delivary
                                </p>
                                <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                  Delivered
                                </p>
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <div className="d-flex justify-content-between pt-2">
                            <p className="fw-bold mb-0">Order Details</p>
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-4">Total</span>{" "}
                              $898.00
                            </p>
                          </div>

                          <div className="d-flex justify-content-between pt-2">
                            <p className="text-muted mb-0">
                              Invoice Number : 788152
                            </p>
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-4">Discount</span>{" "}
                              $19.00
                            </p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="text-muted mb-0">
                              Invoice Date : 22 Dec,2019
                            </p>
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-4">GST 18%</span> 123
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mb-5">
                            <p className="text-muted mb-0">
                              Recepits Voucher : 18KU-62IIK
                            </p>
                            <p className="text-muted mb-0">
                              <span className="fw-bold me-4">
                                Delivery Charges
                              </span>{" "}
                              Free
                            </p>
                          </div>
                        </div>
                        <MDBCardFooter
                          className="border-0 px-4 py-5"
                          style={{
                            backgroundColor: "#a8729a",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        >
                          <MDBTypography
                            tag="h5"
                            className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                          >
                            Total paid:{" "}
                            <span className="h2 mb-0 ms-2">$1040</span>
                          </MDBTypography>
                        </MDBCardFooter>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </section>
            </div>
          ))
        ) : (
          <NoOrderMessage />
        )}
      </div>
      <Footer />
    </div>
  );
}
