import { Box, Flex, Text } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, WarningIcon } from "@chakra-ui/icons";
import { PiTrademark } from "react-icons/pi";


export const Footer = () => {
    return( 
        <Box bg="black" py={4} mt='2%'>
         <Flex fontSize="xl" fontWeight="bold" textColor="white" pb="3%"h={'auto'} border={'2px solid #f5db1b'} m='2px' borderStyle={'dotted'} >
            <Text  ml="10px"> <PiTrademark/> Created By Handika </Text>
         <Text fontSize="xs" textColor="white" ml="20%">
         <EmailIcon/> handikaprasetya.wisnu@gmail.com
        <Text fontSize="xs"  textColor="white" >
        <PhoneIcon/> (62)81224896488
        </Text>
        </Text>
        <Text fontSize={'xl'} ml="35%">Indonesia, Bandung, West Java</Text>
         </Flex>
        </Box>
 )
}