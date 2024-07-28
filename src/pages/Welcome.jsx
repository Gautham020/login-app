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
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    } else {
      const token = JSON.parse(localStorage.getItem("Token"));
      setToken(token);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const Font = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "1000",
    fontSize: "20px",
    lineHeight: "21px",
    color: "#3A244A",
  };

  const subtitleFont = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#6B4F7C",
    marginTop: "10px",
    marginBottom: "20px",
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
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
          borderRadius: 3,
          [defaultTheme.breakpoints.down("sm")]: {
            padding: 2,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            borderRadius: 2,
            p: 3,
            boxShadow: 3,
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={Font}>
            Welcome to Our Community!
          </Typography>
          <Typography component="p" sx={subtitleFont}>
            We are thrilled to have you here. Explore our features and enjoy
            your journey with us. If you have any questions, feel free to reach
            out.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              backgroundColor: "#3A244A",
              "&:hover": {
                backgroundColor: "#3A244A",
                color: "#FFFFFF",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
