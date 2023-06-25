import { Avatar, Box, VStack, Grid, GridItem, Text, HStack  } from "@chakra-ui/react"
import React from "react"
import WithSubnavigation, { Navbar } from "../components/navbar"
export const Contact = () => {
    return(
        <Box>
            {/* <WithSubnavigation/> */}
            <Navbar/>
        <Box border={'10px solid #f5db1b'} ml="50px" mr="50px" h="100%" mt="40px" background="url(https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnRvb24lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60)" bgSize="auto" backgroundPosition="center" objectFit="cover" boxShadow="dark-lg" borderRadius="6px">
            <Grid templateColumns="repeat(2, 1fr)">
                <GridItem w="auto" h="80vh">
                    <VStack justifyContent="center" alignItems="center" h="full">
                    <Text width="80px" h="80px" borderRadius="80px" border="50px solid black" top={45} right={20} position="relative"></Text>
                     <Avatar width="50%" height="50%" borderRadius="50%" src="https://images.unsplash.com/photo-1496681859237-6039cd585c4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZCUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"/>
                    <Text width="80px" h="80px" borderRadius="80px" border="8px solid #f5db1b" bottom={25} left={15} position="relative" ></Text>
                    </VStack>
                </GridItem>
                <GridItem w="100%"  mt="15%" mb="20%" position="relative" right="50px" bgColor="#dce3dd" borderRadius='20px'>
                    <VStack justifyContent="center" alignItems="center" h="full" >
                    <Text fontSize="2xl">Contact Us</Text>
                    <Text fontSize="xs" textAlign="center" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt necessitatibus doloremque eius vel beatae ipsa, magni voluptas officiis praesentium fugiat.</Text>
                    <Text w="55%" border="2px solid #f5db1b" borderRadius="15px"></Text>
                    <HStack >
                    <Text fontWeight="bold" fontSize="xl">Phone</Text>
                    <Box borderBottom="2px solid black">
                        <Text fontSize="sm" mt="5px">(62) 8122-4896488</Text>
                    </Box>
                    </HStack>
                    <HStack>
                    <Text fontWeight="bold" fontSize="xl">Location</Text>
                        <Text fontSize="sm" mt="5px">Indonesia, Bandung, West Java</Text>
                    </HStack>
                    <HStack>
                    <Text fontWeight="bold" fontSize="xl">Email</Text>
                        <Text fontSize="sm" mt="5px" borderBottom="2px solid black">handikaprasetya.wisnu@gmail.com</Text>
                    </HStack>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
        </Box>
    )
}