import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Backendurl } from "../services/helper";
import Navbar from "../components/Navbar";

export default function Cards() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // -------------------------> total price of the cart <--------------------
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  // --------------------> discount coupon logic part <-----------------
  // Step 1: Coupon state variables
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [afterDiscountTotalprice, setAfterDiscountTotalprice] =
    useState(totalPrice);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  let discountedPrice = totalPrice; // Declare discountedPrice outside useEffect and set initial no discount

  // Step 2: Apply coupon function
  const applyCoupon = () => {
    const validCouponCode = "MomsMagic"; // Replace with your valid coupon code
    if (couponCode === validCouponCode) {
      // Generate a random discount percentage between 20% and 70%
      const randomDiscount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      setDiscountPercentage(randomDiscount);

      // Calculate the discount amount
      const discountAmount = (totalPrice * randomDiscount) / 100;
      setAppliedDiscount(discountAmount);

      // Update the total price after applying the discount
      discountedPrice = totalPrice - discountAmount;
      setAfterDiscountTotalprice(discountedPrice);
      // after succesfully applying the coupon set the isCouponApplied to true it it basically for the update the total price after applying the coupon
      setIsCouponApplied(true);
      // Display a toast message or any other feedback to the user
      toast.success(`Coupon applied! You get ${randomDiscount}% off.`);
    } else {
      // Display an error message for invalid coupon code
      toast.error("Invalid coupon code. Please try again.");
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  // -------------->for the current time and date of the delivery of the food <----------------
  const [countdown, setCountdown] = useState({ minutes: 30, seconds: 0 });
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveredTime, setDeliveredTime] = useState("");

  useEffect(() => {
    const calculateCountdown = () => {
      if (countdown.minutes === 0 && countdown.seconds === 0) {
        // Countdown reached, do something or set state accordingly
        return;
      }
      // use spread operator to copy the state object and update the state (basically clone the original state and update the state)
      const newCountdown = { ...countdown };

      if (newCountdown.seconds === 0) {
        newCountdown.minutes -= 1;
        newCountdown.seconds = 59;
      } else {
        newCountdown.seconds -= 1;
      }

      setCountdown(newCountdown);
    };

    const intervalId = setInterval(calculateCountdown, 1000); // after every 1 second the calculateCountdown function will be called

    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {
    const now = new Date();
    // Format current time
    const currentPlus30Minutes = new Date(now.getTime() + 30 * 60000);
    const formattedCurrentTime = `${
      currentPlus30Minutes.getHours() >= 12 ? "PM" : "AM"
    }`;

    // const formattedCurrentTime = `${now.getHours()}:${now.getMinutes()} ${
    //   now.getHours() >= 12 ? "PM" : "AM"
    // }`;

    const deliveryDate = new Date(
      now.getTime() + countdown.minutes * 60000 + countdown.seconds * 1000
    );

    // Format delivery date
    const formattedDeliveryDate = `${deliveryDate.getDate()}.${
      deliveryDate.getMonth() + 1
    }.${deliveryDate.getFullYear()}`;

    // Format delivered time
    const formattedDeliveredTime = `${deliveryDate.getHours()}:${deliveryDate.getMinutes()} ${formattedCurrentTime}`;

    setDeliveryDate(formattedDeliveryDate);
    setDeliveredTime(formattedDeliveredTime);
  }, [countdown]);

  // ------------------------> checkout function <------------------------
  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch(`${Backendurl}/api/auth/orderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          total_price: totalPrice,
          Discount: appliedDiscount,
          final_price: afterDiscountTotalprice,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.status === 200) {
        toast.success(
          `Hey ${userName}, Your order has been placed successfully!`
        );

        setTimeout(() => {
          dispatch({ type: "DROP" });
          navigate("/myOrder");
        }, 2000);
      } else {
        toast.error("Internal Server Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order");
    }
  };

  // -------> to increase or decrease the quantity of the food then update the price accordingly <--------
  const handleQuantityChange = (foodItem, quantityChange) => {
    const newQuantity = foodItem.qty + quantityChange;

    if (newQuantity > 0) {
      // Update the quantity in the cart
      dispatch({
        type: "UPDATE",
        id: foodItem.id,
        qty: newQuantity,
        price: foodItem.price,
      });
    } else {
      // Remove the item from the cart
      dispatch({ type: "REMOVE", index: data.indexOf(foodItem) });
    }
  };

  // -------------> when the cart is empty then display this message to the user <----------------
  if (data.length === 0) {
    return (
      <>
        <Navbar />
        <div
          className="m-5 fs-3 d-flex justify-content-center"
          style={{ color: "#EEF5FF", textAlign: "center" }}
        >
          <span className="text-black">
            Hey{" "}
            <span style={{ color: "#FB641B" }}>
              {userName && userName.toUpperCase()}
            </span>
            , dive into our menu, add some delicious delights to your cart, and
            get ready to savor a delightful meal!
          </span>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="h-100 gradient-custom">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              {/*  Expected delivery section  */}
              <MDBCard className="mb-4 bg-white">
                <MDBCardBody className="text-black">
                  <p>
                    <strong>
                      Expected delivery On{" "}
                      <span className="text-success">{deliveryDate}</span> At{" "}
                      <span className="text-success"> {deliveredTime}</span>
                    </strong>
                  </p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-0">
                        Your Order is Delivered Within{" "}
                        <strong className="text-success">
                          {countdown.minutes.toString().padStart(2, "0")}
                        </strong>{" "}
                        minutes :
                        <strong className="text-success">
                          {countdown.seconds.toString().padStart(2, "0")}
                        </strong>{" "}
                        seconds
                      </p>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>

              {/* Customer Food details Part  */}
              <MDBCard className="mb-4 bg-white text-black">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {data.length} items
                  </MDBTypography>
                </MDBCardHeader>

                <MDBCardBody>
                  {data.map((food, index) => (
                    <MDBRow key={index} className="mb-4">
                      <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                        <MDBRipple
                          rippleTag="div"
                          rippleColor="light"
                          className="bg-image rounded hover-zoom hover-overlay"
                        >
                          <img
                            src={food.img}
                            className="w-100 h-100 rounded"
                            alt={food.name}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                        <p>
                          <strong>{food.name}</strong>
                        </p>
                        <p>
                          <strong>Size:</strong> {food.size}
                        </p>

                        <MDBTooltip
                          wrapperProps={{ size: "sm" }}
                          wrapperClass="me-1 mb-2"
                          title="Remove item"
                        >
                          <MDBIcon
                            fas
                            icon="trash"
                            onClick={() =>
                              dispatch({ type: "REMOVE", index: index })
                            }
                          />
                        </MDBTooltip>

                        <MDBTooltip
                          wrapperProps={{ size: "sm", color: "danger" }}
                          wrapperClass="me-1 mb-2"
                          title="Move to the wish list"
                        >
                          <MDBIcon fas icon="heart" />
                        </MDBTooltip>
                      </MDBCol>

                      {/* Logic for updating the price of the food in real-time */}
                      <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <MDBBtn
                            className="px-3 me-2"
                            onClick={() => handleQuantityChange(food, -1)}
                          >
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            value={food.qty}
                            min={0}
                            className="text-black bg-white text-center"
                            type="number"
                            label="Quantity"
                            onChange={(e) =>
                              handleQuantityChange(
                                food,
                                e.target.value - food.qty
                              )
                            }
                          />

                          <MDBBtn
                            className="px-3 ms-2"
                            onClick={() => handleQuantityChange(food, 1)}
                          >
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>{`₹ ${food.price} /-`}</strong>
                        </p>
                      </MDBCol>
                    </MDBRow>
                  ))}

                  <hr className="my-4" />
                </MDBCardBody>
              </MDBCard>

              {/*  other payment acceptance section  */}
              <MDBCard className="mb-4 mb-lg-0 text-black bg-white">
                <MDBCardBody>
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            {/*  checkout section  */}
            <MDBCol md="4">
              <MDBCard className="mb-4 bg-white">
                <MDBCardHeader>
                  <MDBTypography
                    tag="h5"
                    className="mb-0 fs-3"
                    style={{ color: "#878787" }}
                  >
                    Summary
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center border-0 px-0 pb-0 bg-white fs-5">
                      Price
                      <span>{`₹ ${totalPrice} /-`}</span>
                    </MDBListGroupItem>

                    {/* Display applied coupon details */}
                    {/* here first we check the if  discountPercentage and  appliedDiscount is more than 0 then we display the coupon discount or discunted price  */}
                    {discountPercentage > 0 && appliedDiscount && (
                      <>
                        <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center px-0 bg-white fs-5">
                          <span>Coupon Discount</span>
                          <span className="text-success">
                            <strong>{`-${discountPercentage}% `}</strong>
                            <span>Off</span>
                          </span>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center px-0 bg-white fs-5">
                          <span>Discounted Price</span>
                          <span className="text-success">
                            <strong>{`₹ ${appliedDiscount} /-`}</strong>
                          </span>
                        </MDBListGroupItem>
                      </>
                    )}
                    {/* UI for applying coupon */}
                    <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center px-0 bg-white fs-5">
                      {/* when coupon is applied then we show the remove coupon button other wise applied coupon button  */}
                      {isCouponApplied ? (
                        <MDBBtn
                          color="danger"
                          size="sm"
                          onClick={() => {
                            setDiscountPercentage(0);
                            setAppliedDiscount(0);
                            setAfterDiscountTotalprice(totalPrice);
                            setIsCouponApplied(false);
                          }}
                        >
                          Remove Coupon
                        </MDBBtn>
                      ) : (
                        <>
                          <MDBInput
                            label="Enter Coupon Code"
                            value={couponCode}
                            style={{ backgroundColor: "white", color: "black" }}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                          <MDBBtn
                            size="sm"
                            onClick={applyCoupon}
                            className="text-white"
                            style={{
                              fontSize: "11px",
                              padding: "0.25rem 0.5rem",
                              // backgroundColor: "green",
                            }}
                          >
                            Apply Coupon
                          </MDBBtn>
                        </>
                      )}
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center px-0 bg-white fs-5">
                      <span>Delivery Charges</span>
                      <span className="text-success">
                        <del className="text-black">₹45</del> Free
                      </span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex text-black justify-content-between align-items-center border-0 px-0 mb-3 bg-white">
                      <div>
                        <strong className="fs-4">Total amount</strong>
                        <strong>
                          <p className="mb-0">(including GST)</p>
                        </strong>
                      </div>
                      {/* when coupon is applied then we so the after discount total price of the food other wise total price */}
                      {isCouponApplied ? (
                        <span className="fs-5">
                          <strong>{`₹ ${afterDiscountTotalprice} /-`}</strong>
                        </span>
                      ) : (
                        <span className="fs-5">
                          <strong>{`₹ ${totalPrice} /-`}</strong>
                        </span>
                      )}
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg" onClick={handleCheckOut}>
                    Go to checkout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer />
      </section>
    </div>
  );
}
