import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MyBlog = () => {
  const [data, setData] = useState();
  const params = useParams()
  const token = localStorage.getItem("token");
  console.log(token);


  const showBlog = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setData(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const response = await Axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload()
      // console.log(id);
    } 
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showBlog();
  }, []);
  
  return (
    <>
      <Box>
        <Heading>INI MY BLOG</Heading>
        {data?.map((v, i) => {
          return(
            <Box>
            <Box key={i}>
            {v.title}
            <Image w={"200px"}  src={`https://minpro-blog.purwadhikabootcamp.com/${v.imageURL}`}>
              </Image>
              <Text>{v.id}</Text>
            </Box>
            <Button
            onClick={() => deleteBlog(v.id) }
            >
              Delete
            </Button>
            </Box>
          )
        })}
      </Box>
    </>
  );
};
