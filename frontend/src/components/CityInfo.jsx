import React, { useEffect, useCallback } from 'react';
import { Container, Flex, Text, Box, Image } from '@chakra-ui/react';
import DateTimeCard from './DateTimeCard';
import { useWeatherStore } from '../store/weather.shared';

const CityInfo = ({time,day,date,month,year}) => {
  // Use single selector to avoid multiple store subscriptions
  const weatherData = useWeatherStore(state => state.weatherData);
  const isLoading = useWeatherStore(state => state.isLoading);
  const getWeather = useWeatherStore(state => state.getWeather);

  // Memoize the fetch call
  const fetchWeather = useCallback(async () => {
    await getWeather();
  }, [getWeather]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container alignItems={"center"} justifyContent={"center"} justifyItems={"center"}>
      <Text
        className='city-name'
        marginTop={10}
        textAlign={"center"}
        color={"rgba(60,60,60)"}
        fontWeight={"bold"}
        fontSize={"60px"}
      >
        {weatherData.city}
      </Text>

      <Box width={400} height={200}>
        <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"}>
          <Image src={`/animated/${weatherData?.condition}.svg`}  boxSize={"200px"}></Image>
          <Text
            textAlign={"center"}
            color={"rgba(60,60,150)"}
            fontWeight={"bold"}
            fontSize={"40px"}
          >
            {weatherData.temperature}°c
          </Text>
        </Flex>
      </Box>
      <DateTimeCard time={time} day={day} date={date} month={month} year={year} />
    </Container>
  );
};

export default CityInfo;