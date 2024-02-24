import React from "react";

function About() {
  const containerStyle = {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    padding: "40px",
  };

  const paragraphStyle = {
    fontSize: "1.2em",
    lineHeight: "1.5",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Bookify</h1>
      <p style={paragraphStyle}>
        Welcome to Bookify, your one-stop destination for buying and selling
        books! At Bookify, we believe in the power of sharing knowledge and the
        joy of discovering new stories. Our platform connects book enthusiasts
        from around the world, making it easy for you to find the books you love
        or sell the ones you no longer need.
      </p>
      <p style={paragraphStyle}>
        Whether you're a bookworm looking to expand your collection or someone
        eager to declutter your shelves, Bookify provides a user-friendly and
        secure environment to meet your literary needs. Our community is built
        on a passion for reading, learning, and connecting through the magic of
        books.
      </p>
      <p style={paragraphStyle}>
        Join Bookify today and embark on a journey of literary exploration. Buy,
        sell, and discover a world of stories with Bookify!
      </p>
    </div>
  );
}

export default About;
