import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1055045528942-d0q0koomi1b1d4gcqq8r5dnvrt18laij.apps.googleusercontent.com">
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
