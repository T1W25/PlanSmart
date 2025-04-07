import React from "react";

const AvailabilityToggle = ({ checked, onChange, label = "Availability" }) => {
  const containerStyle = {
    width: "44px",
    height: "24px",
    borderRadius: "9999px",
    backgroundColor: checked ? "green" : "lightgray",
    position: "relative",
    transition: "background-color 0.2s ease",
    cursor: "pointer",
  };

  const toggleStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: checked ? "22px" : "2px",
    transition: "left 0.2s ease",
  };

  const labelStyle = {
    marginLeft: "8px",
    fontSize: "14px",
    color: "#333",
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <div style={containerStyle}>
        <div style={toggleStyle}></div>
      </div>
      <span style={labelStyle}>{label}</span>
    </label>
  );
};

export default AvailabilityToggle;