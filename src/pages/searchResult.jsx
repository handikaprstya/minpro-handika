import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchResult = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await Axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog",
        {
          params: {
            search: searchTerm,
            category: selectedCategory,
            sort: sortOrder, // Include the sort order in the API request
          },
        }
      );

      setSearchResults(response.data.result);
      setSearchTerm("");
      setSelectedCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSortOrder("");
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleClick = (id) => {
    navigate(`/detailPage/${id}`);
    window.location.reload();
  };

  const sortResults = () => {
    const sortedResults = [...searchResults];

    if (sortOrder === "asc") {
      sortedResults.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (sortOrder === "desc") {
      sortedResults.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    return sortedResults;
  };

  return (
    <Box>
      <Box p={"2%"}>
      <Heading
          maxWidth={'60%'}
          ml={'20%'}
          textAlign={"center"}
          mb={5}
          as="h1"
          size="xl"
          color="white"
          textShadow={'2px 2px black'}
          bg="#f5db1b"
          fontWeight="bold" 
          fontFamily={'mono'}
          boxShadow={'3px 8px black'}
        >
          Search Blog
        </Heading>

        <Box color={"white"}>
          <Stack spacing={8}>
            <Center>
              <Box
                mt={'3%'}
                bgColor={"#f5db1b"}
                textColor={'black'}
                boxShadow={"2px 2px  black"}
                p={"20px"}
                borderRadius={"2%"}
                w={"45%"}
                fontFamily={'mono'}
              >
                <Flex justifyContent={"center"}>
                  <FormControl>
                    <FormLabel>Search</FormLabel>
                    <Input
                      color={"black"}
                      placeholder="Keyword or title"
                      _placeholder={{
                        color: "black",
                      }}
                      type="text"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <FormLabel mt={4}>Category</FormLabel>
                    <Select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option
                        style={{
                          backgroundColor: "black",
                          border: "0px",
                        }}
                        value=""
                      >
                        All
                      </option>
                      {categories.map((category) => (
                        <option
                          style={{
                            backgroundColor: "black",
                            border: "0px",
                          }}
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </Select>

                    <FormLabel mt={4}>Sort Order</FormLabel>
                    <Select value={sortOrder} onChange={handleSortOrderChange}>
                      <option
                        value=""
                        style={{
                          backgroundColor: "black",
                          border: "0px",
                        }}
                      >
                        None
                      </option>
                      <option
                        value="asc"
                        style={{
                          backgroundColor: "black",
                          border: "0px",
                        }}
                      >
                        Ascending
                      </option>
                      <option
                        value="desc"
                        style={{
                          backgroundColor: "black",
                          border: "0px",
                        }}
                      >
                        Descending
                      </option>
                    </Select>

                    <Button mt={4} onClick={handleSearch}>
                      Search
                    </Button>
                  </FormControl>
                </Flex>
              </Box>
            </Center>
            <Center>
              <Box
                boxShadow={"0px 0px 15px gray"}
                borderRadius={"20px"}
                w={"40%"}
                p={"30px"}
              >
                {sortResults().map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    cursor={"pointer"}
                    color={"black"}
                    // _hover={{ color: "white", transition: "0.3s" }}
                    mb={"20px"}
                  >
                    <ul>
                      <li>
                        <h3>{item.title}</h3>
                        <p>Created At: {item.createdAt}</p>
                      </li>
                    </ul>
                  </Box>
                ))}
              </Box>
            </Center>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};