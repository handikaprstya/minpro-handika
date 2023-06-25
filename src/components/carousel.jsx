import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"
import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Axios from "axios"

    export const Carousel = () => {
      const [content, setContent] = useState();
      const getContent = async(data) => {
        try{ 
          const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog",data)
          setContent(response.data.result)
        } catch(err) {
          console.log(err)
        }
      }

  useEffect(() => {
    getContent()
  },[])
  return (
    <Box m={'10%'} w={'100%'} h={'full'} bgColor={"whiteAlpha.800"} boxShadow="dark-lg" border={'15px solid #f2df7e'} borderRadius={'30px'}>
      <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        
        >
          {content ?.map((v,i) => {
            return(
              <SwiperSlide key={i} border='50px solid black'>
                <Image  src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}  ></Image>
                <Text  borderRadius={'5px'} bg={'black'} position={'absolute'} fontSize={'2xl'} fontFamily={'monospace'} textColor={'white'} h={'10%'} mt={"60%"} >
                  {v.title}
                </Text>
              </SwiperSlide>
            )
          })}
          </Swiper>
      </Box>
  );
}
