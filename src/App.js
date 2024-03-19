import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routers/routes";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import BackdropLoader from "./components/shared/loader/BackdropLoader";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={2}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
