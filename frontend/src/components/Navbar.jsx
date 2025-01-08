import { Container, Flex, Text, Box, Link, Button } from "@chakra-ui/react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Toaster, toaster } from "@/components/ui/toaster"


const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Container px={4} borderRadius={50}>
      <Flex
        h={{ base: 16, sm: 20 }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Box width={300}>
          <Link href={"/"}>
            <Text
              fontSize={{ base: 22, sm: 28 }}
              fontWeight="extrabold"
              textAlign={"center"}
              bgGradient="linear-gradient(to left,rgba(255, 179, 0, 0.84),rgba(0, 136, 255, 0.76))"
              bgClip="text"
            >
              Weather App
            </Text>
            <TiWeatherPartlySunny size={50} color="rgba(246, 172, 0, 0.84)" />
          </Link>
        </Box>
        <Box textAlign="center" width={300}>
          {isAuthenticated ? (

                        <Link href={"/APIs"}
                        bgGradient="linear-gradient(to left, rgba(0, 136, 255, 0.76), rgba(255, 179, 0, 0.84))"
                        bgClip="text"
                        fontSize={{ base: 22, sm: 28 }}
                        fontWeight="extrabold"
                      >
                        Search for a Country
                      </Link>
          ) : (
            <Button
              bgGradient="linear-gradient(to left, rgba(0, 136, 255, 0.76), rgba(255, 179, 0, 0.84))"
              bgClip="text"
              fontSize={{ base: 22, sm: 28 }}
              fontWeight="extrabold"
              onClick={() =>
                      toaster.create({
                        title: "Log In",
                        description: "You Must Log In first",
                        type: "error",
                        duration: 3500,
                      })}
            >
              Try more APIs
              <Toaster />
            </Button>
          )}
        </Box>
        <Box textAlign="center">
          {isAuthenticated ? (
            <Button
              onClick={() => logout()}
              fontSize={{ base: 20, sm: 26 }}
              fontWeight="extrabold"
              color={"gray.600"}
              bg={"transparent"}
              width={300}
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              fontSize={{ base: 20, sm: 26 }}
              fontWeight="extrabold"
              color={"gray.600"}
              bg={"transparent"}
              width={300}
            >
              <Text>Log In</Text>
            </Button>
          )}
    
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
