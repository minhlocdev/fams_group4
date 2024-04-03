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
import AuthContext from "../utils/authUtil";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, clearAllCookies } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        .then(async (res) => {
          await login(res.data.token, res.data.expiration);
          navigate("/", { replace: true });
        })
        .catch((errors) => {
          ToastEmitter.error(errors.response?.data);
        });
    }
  };
  clearAllCookies();
  return (
    <>
      {/* Login Form */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} alignItems="stretch">
          {/* Your custom content wrapped in a Box component */}
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "stretch",
              "@media (max-width: 768px)": { display: "none" }, // Hide the image for screens smaller than 768px
            }}
          >
            <img
              src={"/img/5816231-1.png"}
              alt="Sign In"
              style={{
                maxWidth: "100%",
                height: "96dvh",
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
    </>
  );
};

export default LoginPage;
