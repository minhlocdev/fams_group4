import React, { memo, useContext } from "react";
import { Header } from "./header";
import Sidebar from "./Sidebar";
import { AppBar, Container, Grid } from "@mui/material";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import AuthContext from "../../../utils/authUtil";

function AppContainer() {
  const [open, setOpen] = React.useState(true);
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <AppBar>
        <Header />
      </AppBar>
      <Grid
        sx={{
          maxWidth: {
            xs: `100%`,
          },
          transition: "all 0.4s ease",
        }}
      >
        <Grid item xs={12} lg={loginUser ? (open ? 10 : 12) : 12}>
          <Container
            sx={{
              marginTop: "60px",
              marginLeft: {
                xs: "0",
                lg: loginUser ? (open ? "270px" : "60px") : "0",
              },
              minHeight: "100dvh",
              transition: "all 0.4s ease",
              maxWidth: {
                xs: `100%`,
                lg: loginUser
                  ? `calc(100% - ${open ? "270px" : "60px"})`
                  : "100%",
              },
            }}
          >
            <Outlet />
          </Container>
        </Grid>
        <Grid item lg={2}>
          {loginUser && <Sidebar open={open} setOpen={setOpen} />}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
export default memo(AppContainer);
