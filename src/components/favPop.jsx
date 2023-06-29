import {
  Avatar,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const FavPop = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [fav, setFav] = useState([]);
  const data = useSelector((state) => state.user.value);

  const getMost = async (data) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&size=10",
        data
      );
      setFav(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const getBlog = async (data) => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/",
        data
      );
      setBlog(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (id) => {
    navigate(`/`);
    navigate(`/detailPage/${id}`);
    window.location.reload();
  };
  useEffect(() => {
    getMost();
    getBlog();
  }, []);
  return (
    <Box
      border={"2px solid #f5db1b"}
      w={"28vw"}
      h={"93vh"}
      maxWidth="500px"
      borderWidth={"5px"}
      borderRadius="md"
      boxShadow="2px 4px black"
    >
      <Tabs isFitted variant="enclosed" cursor={"pointer"}>
        <TabList mb="1em">
          <Tab >Favourite</Tab>
          <Tab>Recently</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {fav?.map((v, i) => {
              return (
                <Flex borderBottom={"1px solid black"} _hover={{bgColor:"gray.300"}}>
                  <Avatar
                   size={'sm'} src={`https://minpro-blog.purwadhikabootcamp.com/${v.User.imgProfile}`}
                  />
                  <Box>
                    <Text                     
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      textOverflow={"ellipsis"}
                      maxWidth={"auto"}
                      fontSize={"10px"}
                    >
                      <Box ml={'5px'} key={i} onClick={() => handleClick(v.id)}>
                        <Text  fontSize={'10px'}>{v.title}</Text>
                        <Text fontSize={"10px"}>{v.User.username}</Text>
                        <Text fontSize={"10px"}> Likes: {v.total_fav}</Text>
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </TabPanel>

          <TabPanel>
            {blog?.map((v, i) => {
              console.log(v);
              return (
                <Flex borderBottom={"1px solid black"}>
                  <Avatar
                    size={'sm'} src={`https://minpro-blog.purwadhikabootcamp.com/${v.User.imgProfile}`}
                  />
                  <Box>
                    <Text
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}
                      textOverflow={"ellipsis"}
                      maxWidth={"200px"}
                      fontSize={"10px"}
                    >
                      <Box key={i} onClick={() => handleClick(v.id)} pb={'10px'}>
                        <Text fontSize={'10px'}>{v.title}</Text>
                        <Text fontSize={"10px"}>{v.User.username}</Text>
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};