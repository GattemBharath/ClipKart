import React from "react";
import error from "../assets/error-404.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found">
      <img className="ig" src={error} alt="Page Not Found..." />
      <br />
      <button className="btn">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            textAlign: "center",
            //   marginLeft: "150px",
          }}
        >
          BACK TO HOME
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
