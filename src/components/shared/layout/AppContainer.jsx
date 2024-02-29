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
      <Sidebar open={open} setOpen={setOpen} />
      <Grid container>
        <Grid item md={open ? 10 : 12}>
          <Container
            sx={{
              marginTop: "60px",
              transition: "margin-left 0.3s ease",
              marginLeft: open ? "270px" : "60px",
              minHeight: "85dvh",
              "@media screen and (min-width: 1200px)": {
                paddingRight: 0,
                paddingLeft: 1,
                maxWidth: !open ? "96%" : "100%",
              },
            }}
          >
            {children}
          </Container>
        </Grid>
        <Grid item md={2}>
          <Sidebar open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
