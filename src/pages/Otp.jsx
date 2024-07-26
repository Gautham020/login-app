import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
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

export default function OtpVerification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeOtp = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
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

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://auth-server-red.vercel.app
/customer/otp`,
        { email }
      );
      if (res.data.success) {
        setIsOtpSent(true);
        Toast.fire({ icon: "success", title: res.data.message });
      } else {
        Toast.fire({ icon: "error", title: res.data.message });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Toast.fire({
        icon: "error",
        title: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 4) {
      Toast.fire({ icon: "warning", title: "Please enter the full OTP." });
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/verifyotp`,
        {
          otp: otpString,
          email,
        }
      );
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.loggedInUser));
        localStorage.setItem("Token", JSON.stringify(res.data.authToken));
        navigate("/");
        Toast.fire({ icon: "success", title: res.data.message });
      } else {
        Toast.fire({ icon: "error", title: res.data.message });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      Toast.fire({
        icon: "error",
        title: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            {isOtpSent ? "Verify OTP" : "Enter Email"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {isOtpSent
              ? "Please enter the OTP sent to your email."
              : "Enter your email to receive the OTP."}
          </Typography>
          <TextField
            onChange={handleChangeEmail}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            InputProps={{ readOnly: isOtpSent }}
            sx={{ mb: 2 }}
          />
          {isOtpSent && (
            <Grid container spacing={1} justifyContent="center">
              {otp.map((digit, index) => (
                <Grid item key={index}>
                  <TextField
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleChangeOtp(e, index)}
                    margin="normal"
                    required
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    sx={{ width: "50px" }}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          <Button
            onClick={isOtpSent ? verifyOtp : sendOtp}
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
            disabled={isLoading}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </Button>
          {isOtpSent && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/resend-otp" variant="body2">
                  Resend OTP
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
