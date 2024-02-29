import { React, useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../utils/authUtil";
import { Typography, Button, Chip, Box, Stack, Container } from "@mui/material";
import { Footer } from "./shared/layout/footer";
import axios from "axios";

const LOGIN_URL = "/auth";
const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
      <div
        className="overlap-group"
        style={{
          position: "relative",
          backgroundPosition: "center",
          backgroundRepeat: "no - repeat",
          backgroundSize: "cover",
          height: "90vh",
          backgroundImage: "url(/img/5816231-1.png)",
        }}
      >
        <div style={{ height: "5px" }}></div>
        <Box
          className="frame-3"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "600px",
            alignItems: "center",
            gap: "30px",
            padding: "25px 20px",
            position: "relative",
            left: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0px 20px 40px #00000029",
            margin: "50px",
          }}
        >
          <Box
            className="frame-4"
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
              position: "relative",
              flex: "0 0 auto",
            }}
          >
            <Typography
              className="FPT-fresh-academy"
              sx={{
                position: "relative",
                width: "fit-content",
                marginTop: "-1px",
                color: "#000000",
                textAlign: "center",
                letterSpacing: "5px",
                fontSize: "38px",
                fontFamily: "Inter-Bold, Helvetica",
                fontWeight: "700",
                lineHeight: "normal",
                fontStyle: "normal",
              }}
            >
              FPT Fresh Academy
              <br />
              Training Management
            </Typography>
            <Typography
              className="if-you-don-t-have"
              sx={{
                position: "relative",
                width: "fit-content",
                fontWight: "400",
                color: "transparent",
                fontSize: "16px",
                letterSpacing: 0,
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              <span className="span" style={{ color: "#000000" }}>
                If you don’t have the account, please contact{" "}
              </span>
              <span
                className="text-wrapper-2"
                style={{ color: "#285d9a", textDecoration: "underline" }}
              >
                FA.HCM@fsoft.com.vn
              </span>
            </Typography>
          </Box>

          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Box
            className="frame-5"
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              position: "relative",
              flex: "0 0 auto",
              backgroundColor: "#ffffff",
            }}
          >
            <form onSubmit={handleSubmit} id="loginForm">
              <div>
                <Typography className="text-danger" sx={{ display: "none" }}>
                  The Username or Password is Incorrect
                </Typography>
              </div>
              <Box
                className="frame-6"
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  position: "relative",
                  flex: "0 0 auto",
                  marginBottom: "20px",
                }}
              >
                <div className="username-input-container">
                  <input
                    className="frame-7"
                    style={{
                      display: "flex",
                      width: "389px",
                      alignItems: "center",
                      gap: "10px",
                      padding: "20px",
                      position: "relative",
                      flex: "0 0 auto",
                      backgroundColor: "rgba(241, 241, 241, 1)",
                      borderRadius: "10px",
                      caret: "white",
                    }}
                    type="text"
                    id="username"
                    ref={userRef}
                    label="Username"
                    placeholder="Enter Email"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  />
                </div>

                <div
                  className="password-input-container"
                  sytle={{
                    display: "flex",
                    width: "389px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    flex: "0 0 auto",
                    backgroundColor: "rgba(241, 241, 241, 1)",
                    borderRadius: "10px",
                  }}
                >
                  <input
                    className="frame-8"
                    style={{
                      display: "flex",
                      width: "389px",
                      alignItems: "center",
                      gap: "10px",
                      padding: "20px",
                      position: "relative",
                      flex: "0 0 auto",
                      backgroundColor: "rgba(241, 241, 241, 1)",
                      borderRadius: "10px",
                    }}
                    type="password"
                    id="password"
                    label="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                  {/* <img className="visibility-off" src="" id="password-toggle" alt="" /> */}
                </div>
              </Box>
              <Button
                sx={{
                  display: "flex",
                  width: "389px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "20px",
                  position: "relative",
                  flex: "0 0 auto",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px #00000040",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "large",
                }}
                variant="contained"
                color="success"
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
