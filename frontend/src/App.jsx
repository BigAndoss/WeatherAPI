import { Button } from "@/components/ui/button";
import { Box, HStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage  from "./pages/CreatePage";
import  HomePage from "./pages/HomePage";
import Navbar  from "./components/Navbar";
import { useEffect } from "react";


function App() {
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_PORT);
  // }, []);
  return (
    
    <Box 
    minH={"100vh"}
    backgroundImage="url('/img/background.png')"
    backgroundSize="cover"
    backgroundPosition="center"
    >
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/create"} element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
