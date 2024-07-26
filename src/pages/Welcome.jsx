import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import img1 from "../Images/fig1.png";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Welcome() {
  const navigate = useNavigate();

  const [Token, setToken] = useState("");

  useEffect(() => {
    const tokenString = localStorage.getItem("Token");
    if (!tokenString) {
      navigate("/login");
    } else {
      try {
        const token = JSON.parse(tokenString);
        setToken(token);
      } catch (error) {
        console.error("Error parsing token:", error);
        localStorage.removeItem("Token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const Font = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "1000",
    fontSize: "20px",
    lineHeight: "21px",
    color: "#3A244A",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${img1})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={8}
        sm={6}
        md={5}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
          borderRadius: 3, // Rounded corners
          [defaultTheme.breakpoints.down("sm")]: {
            padding: 2,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 360, // Smaller max width
            borderRadius: 2, // Additional rounded corners
            p: 3, // Padding inside the form box
            boxShadow: 3, // Elevation for the form box
            backgroundColor: "#ffffff",
          }}
        >
          <Typography component="h1" variant="h1" sx={Font}>
            Welcome to Our Website!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
