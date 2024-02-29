import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routers/routes";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import BackdropLoader from "./components/shared/loader/BackdropLoader";
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<BackdropLoader />}>
        <Routes>
          {publicRoute.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </ThemeProvider>

  );
}

export default App;

