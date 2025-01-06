import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import App from "./App.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './auth/auth0-config';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider {...auth0Config}>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
