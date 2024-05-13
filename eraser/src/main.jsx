import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLINET_ID}
        >
          <App />
          <Toaster />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
);
