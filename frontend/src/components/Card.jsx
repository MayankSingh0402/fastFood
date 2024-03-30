// https://getbootstrap.com/docs/5.0/components/card/
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
// import Modal from "../Modal";
// import Cart from "../screens/Cart";
// import { ToastContainer, toast } from "react-toastify";

export default function Card(props) {
  const data = useCart();

  //console.log(data + " from card");
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  
  const priceRef = useRef();
  let options = props.options;
  let foodItem = props.item;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    // when user is not login and want to add to cart some dishes it navigate to login page and after login it will come back to same page
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);

    console.log(new Date());
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        // toast.success("Item added to cart");
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        // toast.success("Item added to cart");
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.ImgSrc,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]); //This is where Price is changing

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        maxHeight: "360px",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        "&:hover": {
          transform: "scale(1.02) rotate(-2deg)", // Slight shake effect
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <img
        src={foodItem.img || props.ImgSrc}
        className="card-img-top"
        alt="..."
        style={{
          height: "180px",
          objectFit: "cover",
          filter: "brightness(100%)",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      />
      <div
        className="card-body"
        style={{
          backgroundColor: "#EEF5FF",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      >
        <h5
          className="card-title"
          style={{
            color: "#383C42",
            marginBottom: "10px",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {foodItem.name || props.foodName}
        </h5>
        <div
          className="container w-100 p-0 "
          style={{ height: "38px", display: "flex", alignItems: "center" }}
        >
          <select
            className="m-2 h-100 text-white rounded custom-select"
            style={{
              backgroundColor: "#393E46",
              padding: "8px",
              border: "none",
              color: "#fff",
            }}
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 w-20 text-white rounded custom-select"
            style={{
              backgroundColor: "#393E46",
              padding: "8px",
              border: "none",
              color: "#fff",
            }}
            ref={priceRef}
            onChange={handleOptions}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div
            className="d-inline h-100 ms-2 w-20 fs-5"
            style={{ color: "#161A1F", fontWeight: "bold" }}
          >
            ₹{finalPrice}/-
          </div>
        </div>
        <hr style={{ margin: "10px 0" }} />
        <button
          className="btn justify-center ms-2 text-white addCartButton fs-6"
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#FB641B",
            // cursor: "pointer",
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <style>
        {`
         .custom-select{
          cursor:pointer;
         }

         .addCartButton{
          transition:color 0.3s ease-in-out;
          background-color:#FB641B;
          color:#FB641B;
         }

         .addCartButton:hover{
          background-color:#FB641B;
         }
         
        `}
      </style>
      {/* <ToastContainer /> */}
    </div>
  );
}
