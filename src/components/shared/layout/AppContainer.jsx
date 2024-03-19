import React from "react";
import { Header } from "./header";
import Sidebar from "./Sidebar";
import { AppBar, Container, Grid } from "@mui/material";
import { Footer } from "./footer";

export default function AppContainer({ children }) {
  const [open, setOpen] = React.useState(false);
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
        <Grid item xs={12} lg={open ? 10 : 12}>
          <Container
            sx={{
              marginTop: "60px",
              marginLeft: { xs: "0", lg: open ? "270px" : "60px" },
              minHeight: "100dvh",
              transition: "all 0.4s ease",
              maxWidth: {
                xs: `100%`,
                lg: `calc(100% - ${open ? "270px" : "60px"})`,
              },
            }}
          >
            {children}
          </Container>
        </Grid>
        <Grid item lg={2}>
          <Sidebar open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
