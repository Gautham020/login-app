import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import img1 from "../Images/sign-up.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function SignInSide() {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState(Array(4).fill(""));

  // Define the refs at the top level of the component
  const otpRefs = React.useRef([]);
  if (otpRefs.current.length === 0) {
    otpRefs.current = Array(4)
      .fill()
      .map(() => React.createRef());
  }

  const handleChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChangeOtp = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if value is entered
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].current.focus();
      }
      // Move to the previous input if value is deleted
      if (!value && index > 0) {
        otpRefs.current[index - 1].current.focus();
      }
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!userInfo.name) newErrors.name = "Name is required";
    if (!userInfo.phone) newErrors.phone = "Phone number is required";
    if (!userInfo.email) newErrors.email = "Email is required";
    if (!userInfo.password) newErrors.password = "Password is required";
    if (!userInfo.confirmPassword)
      newErrors.confirmPassword = "Re-entering the password is required";
    if (userInfo.password !== userInfo.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
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

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(`https://auth-server-dusky.vercel.app/customer/register`, userInfo)
      .then((response) => {
        if (response.data.success) {
          setIsOtpSent(true);
          Toast.fire({
            icon: "success",
            title: "OTP sent to your email",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Toast.fire({
          icon: "error",
          title: error.response?.data?.message || "An error occurred",
        });
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    axios
      .post(`https://auth-server-dusky.vercel.app/customer/verifyotp`, {
        email: userInfo.email,
        otp: otp.join(""),
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.loggedInUser)
          );
          localStorage.setItem(
            "Token",
            JSON.stringify(response.data.authToken)
          );
          navigate("/");
          Toast.fire({
            icon: "success",
            title: "Registration successful!",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Toast.fire({
          icon: "error",
          title: error.response?.data?.message || "An error occurred",
        });
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const Font = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "21px",
    color: "rgba(0, 0, 0, 0.7)",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12} // Full width on mobile
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
          height: { xs: "30vh", sm: "90vh" }, // Adjust height for mobile
          width: { xs: "100%", sm: "auto" }, // Full width on mobile
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
          [defaultTheme.breakpoints.down("sm")]: {
            padding: 2,
            marginTop: 2, // Add margin for spacing
          },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography component="h1" variant="h5" sx={Font}>
            {isOtpSent ? "Verify OTP" : "Register"}
          </Typography>
          {!isOtpSent ? (
            <>
              <TextField
                onChange={handleChangeUserInfo}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                onChange={handleChangeUserInfo}
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                onChange={handleChangeUserInfo}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                onChange={handleChangeUserInfo}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={handleChangeUserInfo}
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={handleRegister}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3A244A",
                  "&:hover": {
                    backgroundColor: "#3A244A",
                  },
                }}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ textAlign: "center", mb: 2 }}
              >
                Please enter the OTP sent to your email.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {otp.map((_, index) => (
                  <TextField
                    key={index}
                    value={otp[index]}
                    onChange={(e) => handleChangeOtp(e, index)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        width: "2rem",
                        height: "2.5rem",
                        fontSize: "1.5rem",
                        textAlign: "center",
                      },
                    }}
                    ref={otpRefs.current[index]}
                  />
                ))}
              </Box>
              <Button
                onClick={handleVerifyOtp}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3A244A",
                  "&:hover": {
                    backgroundColor: "#3A244A",
                  },
                }}
              >
                Verify OTP
              </Button>
            </>
          )}
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
