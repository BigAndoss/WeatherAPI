import React from 'react'
import {Container, Flex, Text, Box, Image} from '@chakra-ui/react'
import DateTimeCard from './DateTimeCard'
const CityInfo = () => {
  return (
    <Container
          alignItems={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Text
            marginTop={10}
            textAlign={"center"}
            color={"rgba(60,60,60)"}
            fontWeight={"bold"}
            fontSize={"60px"}
          >
            Ferizaj
          </Text>

          <Box width={400} height={200}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Image src="/animated/cloudy-day-2.svg" boxSize={"200px"}></Image>
              <Text
                textAlign={"center"}
                color={"rgba(60,60,150)"}
                fontWeight={"bold"}
                fontSize={"40px"}
              >
                20°c
              </Text>
            </Flex>
          </Box>
          <DateTimeCard/>
        </Container>
)
}

export default CityInfo