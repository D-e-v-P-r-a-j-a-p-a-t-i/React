import React from "react";
import { Typography, Container, AppBar } from "@mui/material";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#2196f3", // Light gray background color
  padding: "1rem 0", // Padding top and bottom 1rem, left and right 0
  textAlign: "center",
};

const Footer = () => {
  return (
    <AppBar position="static" style={footerStyle}>
      <Container>
        <Typography variant="body2">
          © 2024 E-Commerce, Inc.
        </Typography>
      </Container>
    </AppBar>
  );
};

export default Footer;
