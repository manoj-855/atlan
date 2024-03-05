import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        backgroundColor: "white",
        width: "30%",
        marginLeft: "35%",
        borderRadius: "10px",
      }}
    >
      <p style={{ marginTop: "10px" }}>Loading...</p>
      <div className="modal-body text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Your awesome page will load within few seconds!!!</p>
      </div>
    </div>
  );
};

export default Loading;
