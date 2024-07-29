import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import img1 from "../Images/fig1.png";

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
    fontSize: {
      xs: "22px", // Font size for mobile screens
      sm: "24px", // Font size for larger screens
    },
    lineHeight: "28px",
    color: "#3A244A",
  };

  const subtitleFont = {
    fontFamily: "Sans serif",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: {
      xs: "14px", // Font size for mobile screens
      sm: "16px", // Font size for larger screens
    },
    lineHeight: "20px",
    color: "#6B4F7C",
    marginTop: "10px",
    marginBottom: "20px",
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow: "auto" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: { xs: "30vh", md: "100vh" }, // Adjust height for mobile and desktop
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
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 2, sm: 3, md: 5 },
          borderRadius: { xs: 0, md: 3 }, // Border radius adjustments for mobile and desktop
          marginTop: { xs: -10, md: 0 }, // Adjust margin-top for mobile and reset for desktop
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 320, sm: 360, md: 500 }, // Adjust max-width for different screen sizes
            borderRadius: 2,
            p: { xs: 3, md: 5 }, // Adjust padding for mobile and desktop
            boxShadow: 3,
            backgroundColor: "#ffffff",
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
