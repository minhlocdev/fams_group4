import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.css";
import App from "./App";
import { AuthProvider } from "./utils/authUtil";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./services/queries/queryClient";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
