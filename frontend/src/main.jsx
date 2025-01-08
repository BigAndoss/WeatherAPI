import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import App from "./App.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './auth/auth0-config';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Spinner, Flex } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner 
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-ard7b0jon01tru7s.us.auth0.com"
      clientId="Y6lPMAC9Ic91lrWdvGOnuoWfeDezPx0i"
      authorizationParams={{
        redirect_uri: "https://weatherapi-pxm4.onrender.com/APIs",
      }}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
