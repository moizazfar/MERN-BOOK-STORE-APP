import React from "react";

const DashboardUser = () => {
  const welcomeStyle = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "2em",
    padding: "50px",
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron text-center">
        <h1 style={welcomeStyle}>Welcome to user Dashboard</h1>
        <p className="lead">
          Upload your books, manage books, and stay organized with our powerful
          dashboard.
        </p>
      </div>
    </div>
  );
};

export default DashboardUser;
