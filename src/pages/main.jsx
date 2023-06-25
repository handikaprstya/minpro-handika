import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Avatar, Text} from "@chakra-ui/react"
import { Carousel } from "../components/carousel"
import WithSubnavigation from "../components/navbar"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { Footer } from "../components/footer"
import { useSelector } from "react-redux"
import { Pagination } from "../components/pagination"
import { FavPop } from "../components/favPop"
import { ViewLike } from "../components/Like/viewLike"


export const LandingPage = () => {
    const data = useSelector((state) => state.user.value)
    console.log(data.username);
    const [datas, setDatas] = useState({})

    useEffect(() => {
        Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=2&orderBy=total_fav&sort=DESC").then((res) => {
            setDatas(res.data)
        })
    }, [])
    return (
        <Box>
        <Box  h="auto" m={"2%"} >
       
            <Flex w="100%" h="90vh" >
            <Flex w="65%" justify="center" align="center" borderRadius="10px">
            <Carousel/>
                
            </Flex>
            <Flex   w="35%">
                <Box  mx="auto" >             
                    <Tabs h={'auto'}>
                    <FavPop/>
                    </Tabs>
                </Box>
            </Flex>
            </Flex>
            <ViewLike/>
        <Box m={"3%"} w='auto' h={"auto"} border={"2px solid #f5db1b"} borderRadius={"10px"}>
            <Pagination/>
        </Box>
        </Box>
        </Box>
    )
}