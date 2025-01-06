import { Container, Flex, Text, Box, Link, Button } from "@chakra-ui/react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useAuth0 } from '@auth0/auth0-react';


import React from "react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Container  px={4}   borderRadius={50}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
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
        <Box textAlign="center">
          <Link href="/APIs">
          <Text
            color="transparent"
            bgGradient="linear-gradient(to left, #7928CA, #FF0080)"
            bgClip="text"
            fontSize={{ base: 22, sm: 28 }}
            fontWeight="extrabold"
            >
            Gradient Text
          </Text>
            </Link>
        </Box>
        <Box textAlign="center">
          {isAuthenticated ? (
            <Button onClick={() => logout()}>
              Log Out
            </Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
