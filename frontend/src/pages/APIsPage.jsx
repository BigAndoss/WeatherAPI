import React from 'react'
import { useToast } from "@chakra-ui/toast";
import { Container, Flex, Text, Box, Link, Button } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import SearchBox from "@/components/SearchBox"
import CityInfo from "@/components/CityInfo"



const APIsPage = () => {

  return (

       <Container>
       <Flex
         h={"80vh"}
         alignItems={"center"}
         justifyContent={"center"}
         justifyItems={"center"}
         flexDir={"column"}
       >
         <SearchBox />
         <Flex>
           <CityInfo />
           
         </Flex>
         <Button
      onClick={() =>
        toaster.create({
          title: "File saved",
          description: "File saved successfully",
          type: "warning",
          duration: 3500,
        })}
      >Click me</Button>
      <Toaster />
       </Flex>
     </Container>
    
  )
}

export default APIsPage