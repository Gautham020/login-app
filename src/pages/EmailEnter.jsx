import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import img1 from "../Images/fig1.png";

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

export default function EnterEmail({}) {
  //   useEffect(() => {
  //     setNav(false);
  //   }, []);

  let navigate = useNavigate();
  const [email, setEmail] = useState("");

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
  const handleChangeUserInfo = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/customer/otp`, { email })
      .then(async (res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
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
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "An error occurred. Please try again.",
        });
      });
  };

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
          borderRadius: 3,
          [defaultTheme.breakpoints.down("sm")]: {
            padding: 2,
            justifyContent: "center",
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
          }}
        >
          <Typography component="h1" variant="h1" sx={Font}>
            Verify OTP
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter the OTP sent to your email.
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
            Send OTP
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/resend-otp" variant="body2">
                Resend OTP
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
