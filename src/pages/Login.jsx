import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

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

export default function SignInSide({ setNav, state, setState }) {
  useEffect(() => {
    setNav(false);
  }, []);

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
    e.preventDefault(); // Prevent default form submission
    axios
      .post(`http://localhost:4000/customer/Login`, userInfo)
      .then(async (res) => {
        if (res.data.success) {
          setNav(true);
          setState(!state);
          localStorage.setItem("user", JSON.stringify(res.data.loggedInUser));
          localStorage.setItem("Token", JSON.stringify(res.data.authToken));
          await navigate("/");
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
        } else {
          if (res.data.errorType === "password") {
            Toast.fire({
              icon: "error",
              title: res.data.message,
            });
          } else {
            Toast.fire({
              icon: "error",
              title: res.data.message,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Font = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "1000",
    fontSize: "20px",
    lineHeight: "21px",
    color: "#3A244A",
    [defaultTheme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
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
          [defaultTheme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
          borderRadius: 3, // Rounded corners
          [defaultTheme.breakpoints.down("sm")]: {
            padding: 2,
            justifyContent: "center",
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
            Fill what we know!
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/otp" variant="body2">
                Forgot Password
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
