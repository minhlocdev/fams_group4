"use client";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoute, publicRoute } from "./routers/routes";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import BackdropLoader from "./components/shared/loader/BackdropLoader";
import { ToastContainer } from "react-toastify";
import AppContainer from "./components/shared/layout/AppContainer";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from "./components/shared/loader/ErrorFallback";
import ProtectedRoute from "./middleWare/ProtectedRoute";
const theme = createTheme();
function App() {

  const { reset } = useQueryErrorResetBoundary();
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<AppContainer />}>
          {publicRoute.map((route) => (
            <Route key={route.path} path={route.path} element={
              <Suspense fallback={<BackdropLoader />}>
                <ErrorBoundary
                  onReset={reset}
                  fallbackRender={({ resetErrorBoundary }) => (
                    <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                  )}
                >
                  {route.element}
                </ErrorBoundary>
              </Suspense>} />
          ))}
          {privateRoute.map((route) => (
            <Route key={route.path} path={route.path} element={
              <Suspense fallback={<BackdropLoader />}>
                <ProtectedRoute level={route.level}>
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    {route.element}
                  </ErrorBoundary>
                </ProtectedRoute>
              </Suspense>
            } />
          ))}
        </Route>
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
    </ThemeProvider>
  );
}

export default App;
