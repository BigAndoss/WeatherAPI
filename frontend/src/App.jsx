import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage  from "./pages/CreatePage";
import  HomePage from "./pages/HomePage";
import Navbar  from "./components/Navbar";
import APIsPage from "./pages/APIsPage";
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    
    <Box 
    minH={"100vh"}
    backgroundImage="url('/img/background.png')"
    backgroundSize= "cover"
    
    backgroundPosition="center"
    >
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/create"} element={<CreatePage />} />
        <Route 
          path="/APIs" 
          element={
            <ProtectedRoute>
              <APIsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Box>
  );
}

export default App;
