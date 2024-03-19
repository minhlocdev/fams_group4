import React, { useContext, useState } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { postLoginUser } from "../services/User";
import token from "../utils/token";
import { ACCESS_TOKEN_KEY } from "../constants/token";
import AuthContext from "../utils/authUtil";
import ToastEmitter from "./shared/lib/ToastEmitter";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "classadmin@example.com",
    password: "classadmin456",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    //Validate Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    }
    //Validate Password
    if (formData.password.trim() === "") {
      newErrors.password = "Password is Required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (e) => {
    if (!validateForm()) {
      e.preventDefault();
    } else {
      e.preventDefault();
      postLoginUser(formData)
        .then((res) => {
          token.setToken(ACCESS_TOKEN_KEY, res.data.token);
          login(res.data.token, res.data.expiration);
          navigate("/", { replace: true });
        })
        .catch((errors) => {
          ToastEmitter.error(errors.response?.data);
        });
    }
  };
  return (
    <>
      {/* Header Box Component */}
      <Box
        sx={{
          width: "100%",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
          background: "#2D3748",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          className="logo"
          style={{ background: "#2D3748", width: 70, height: 40 }}
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="logo fpt"
        />
        <Stack
          direction="row"
          sx={{ display: "flex", alignItems: "center", marginRight: 4 }}
          spacing={3}
        >
          <Chip
            avatar={
              <img
                src={process.env.PUBLIC_URL + "/img/uniGate.png"}
                alt="unigate"
              />
            }
            sx={{ background: "#0B2136", color: "white", padding: 1 }}
            label={"uniGate"}
          />
        </Stack>
      </Box>

      {/* Login Form */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} alignItems="stretch">
          {/* Your custom content wrapped in a Box component */}
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "25px",
              position: "relative",
              flex: "0 0 auto",
              "@media (max-width: 768px)": { display: "none" }, // Hide the image for screens smaller than 768px
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/img/5816231-1.png"}
              alt="Sign In"
              style={{
                maxWidth: "100%",
                height: "90vh",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Sign-in form */}
          <div>
            <h2
              style={{ textAlign: "center", fontSize: "28px", color: "#000" }}
            >
              FPT Fresher Academy
            </h2>
            <p style={{ textAlign: "center", fontSize: "16px", color: "#666" }}>
              If you don’t have the account, please contact{" "}
              <span style={{ color: "#285d9a", textDecoration: "underline" }}>
                FA.HCM@fsoft.com.vn
              </span>
            </p>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: "15px" }}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </FormControl>
              <Button variant="contained" type="submit" fullWidth>
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>

      {/* Footer Box Component */}
      <Box
        sx={{
          width: "100%",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 2,
          paddingRight: 2,
          background: "#2D3748",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        <div
          style={{
            color: "white",
            padding: "10px 0",
          }}
        >
          Copyright @2022 BA Warrior. All right reserved
        </div>
      </Box>
    </>
  );
};

export default LoginPage;
