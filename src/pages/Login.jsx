import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import img1 from "../Images/fig1.png";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function SignInSide({ state, setState }) {
  useEffect(() => {}, []);

  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://auth-server-dusky.vercel.app/customer/login`, userInfo)
      .then(async (res) => {
        if (res.data.success) {
          setState(!state);
          localStorage.setItem("user", JSON.stringify(res.data.loggedInUser));
          localStorage.setItem("Token", JSON.stringify(res.data.authToken));
          await navigate("/");
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        Toast.fire({
          icon: "error",
          title: "An error occurred. Please try again.",
        });
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Font = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "1000",
    fontSize: {
      xs: "18px", // Font size for small screens
      sm: "20px", // Font size for larger screens
    },
    lineHeight: "21px",
    color: "#3A244A",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "auto" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
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
          height: {
            xs: "40vh", // Smaller height for mobile
            sm: "100vh", // Full height for larger screens
          },
          width: "100%",
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
          padding: { xs: 2, sm: 3 }, // Reduced padding on mobile
          marginTop: { xs: 2 }, // Margin-top on mobile
          height: "auto", // Allow auto height for content
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: { xs: 320, sm: 400 } }}>
          {" "}
          {/* Adjust maxWidth */}
          <Typography component="h1" variant="h5" sx={Font}>
            Sign In
          </Typography>
          <TextField
            onChange={handleChangeUserInfo}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Email"
            name="email"
            autoComplete="email"
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleChangeUserInfo}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Set Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#3A244A",
              boxShadow: "5px 5px 250px #657E96",
              borderRadius: "10px",
              height: "50px",
              "&:hover": {
                backgroundColor: "#3A244A",
                color: "#FFFFFF",
              },
            }}
          >
            Sign In
          </Button>
          <Link to="/register">
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                color: "#3A244A",
                backgroundColor: "#FFFFFF",
                boxShadow: "5px 5px 250px #3A244A",
                borderRadius: "10px",
                border: "2px solid #3A244A",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#3A244A",
                  color: "#FFFFFF",
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
