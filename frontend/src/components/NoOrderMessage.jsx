import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NoOrderMessage = () => {
  return (
    <div className="bg-image vh-100 d-flex align-items-center justify-content-center text-white">
      <div
        className="text-center p-4 rounded"
        style={{
          boxShadow: "0px 4px 8px #FFFFFF",
          // backgroundColor: "#1B1E30",
        }}
      >
        <h1 className="display-4">You don't have any orders</h1>
        <p className="lead">Please place an order to get started.</p>
      </div>
    </div>
  );
};

export default NoOrderMessage;
