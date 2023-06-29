// import {
//     Box,
//     Input,
//     Flex,
//     Text,
//     IconButton,
//     Button,
//     Stack,
//     Collapse,
//     Icon,
//     Link,
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
//     useColorModeValue,
//     useBreakpointValue,
//     useDisclosure,
//     Avatar,
//     WrapItem
//   } from '@chakra-ui/react';
//   import {
//     HamburgerIcon,
//     CloseIcon,
//     ChevronDownIcon,
//     ChevronRightIcon,
//     SearchIcon,
//   } from '@chakra-ui/icons';
//   import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
  
//   export default function WithSubnavigation() {
//     const { isOpen, onToggle } = useDisclosure();
//     const navigate = useNavigate();
//     const data = useSelector((state) => state.user.value)
//     console.log(data.username)
//     return (
//       <Box boxShadow="xl" bg="whiteAlpha.800">
//         <Flex
//           bg={useColorModeValue('white', 'gray.800')}
//           color={useColorModeValue('gray.600', 'white')}
//           minH={'80px'}
//           py={{ base: 2 }}
//           px={{ base: 4 }}
          
//           borderBottom={1}
//           borderStyle={'solid'}
//           borderColor={useColorModeValue('gray.200', 'gray.900')}
//           align={'center'}
          
//           >
//           <Flex
//             flex={{ base: 1, md: 'auto' }}
//             ml={{ base: -2 }}
//             display={{ base: 'flex', md: 'none' }}>
//             <IconButton
//               onClick={onToggle}
//               icon={
//                 isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//               }
//               variant={'ghost'}
//               aria-label={'Toggle Navigation'}
//             />
//           </Flex>
//           <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} >
//             <Text 
//               textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
//               fontFamily={'heading'}
//               color={useColorModeValue('gray.800', 'white')}
//               fontWeight="extrabold"
//               fontSize={19}
//               >
//               MyBLOG
//             </Text>
  
//             <Flex display={{ base: 'none', md: 'flex' }} ml={10} >
//               <DesktopNav />
//             </Flex>
//           </Flex>
//           <Text mr="8%">{data.username}</Text>
//           <Stack
//             flex={{ base: 1, md: 0 }}
//             justify={'flex-end'}
//             direction={'row'}
//             spacing={6}  >
//            <Link href='/profile'>
//            <WrapItem >
//               <Avatar  name='Ryan Florence' src='https://bit.ly/ryan-florence' />
//               <Text></Text>
//             </WrapItem>
//            </Link>

//             <Button
//               as={'a'}
//               display={{ base: 'none', md: 'inline-flex' }}
//               fontSize={'sm'}
//               fontWeight={600}
//               color={'white'}
//               bg={'#f5db1b'}
//               href={'#'}
//               _hover={{
//                 bg: '#f2df7e',
//                 color: 'black',
//                 transition:'2s all ease in out'
//               }}><Link 
//               href='/register'
//               >
//               Sign Up 
//               </Link>
//             </Button>
        
//           </Stack>
//         </Flex>
  
//         <Collapse in={isOpen} animateOpacity>
//           <MobileNav />
//         </Collapse>
//       </Box>
//     );
//   }
  
//   const DesktopNav = () => {
//     const linkColor = useColorModeValue('gray.600', 'gray.200');
//     const linkHoverColor = useColorModeValue('gray.800', 'white');
//     const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
//     return (
//       <Stack direction={'row'} spacing={4}>
//         {NAV_ITEMS.map((navItem) => (
//           <Box key={navItem.label}>
//             <Popover trigger={'hover'} placement={'bottom-start'}>
//               <PopoverTrigger>
//                 <Link
//                   p={2}
//                   href={navItem.href ?? '#'}
//                   fontSize={'sm'}
//                   fontWeight={500}
//                   color={linkColor}
//                   _hover={{
//                     textDecoration: 'none',
//                     color: linkHoverColor,
//                   }}>
//                   {navItem.label}
//                 </Link>
//               </PopoverTrigger>
  
//               {navItem.children && (
//                 <PopoverContent
//                   border={0}
//                   boxShadow={'xl'}
//                   bg={popoverContentBgColor}
//                   p={4}
//                   rounded={'xl'}
//                   minW={'sm'}>
//                   <Stack>
//                     {navItem.children.map((child) => (
//                       <DesktopSubNav key={child.label} {...child} />
//                     ))}
//                   </Stack>
//                 </PopoverContent>
//               )}
//             </Popover>
//           </Box>
//         ))}
//       </Stack>
//     );
//   };
  
//   const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//     return (
//       <Link
//         href={href}
//         role={'group'}
//         display={'block'}
//         p={2}
//         rounded={'md'}
//         _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
//         <Stack direction={'row'} align={'center'}>
//           <Box>
//             <Text
//               transition={'all .3s ease'}
//               _groupHover={{ color: 'pink.400' }}
//               fontWeight={500}>
//               {label}
//             </Text>
//             <Text fontSize={'sm'}>{subLabel}</Text>
//           </Box>
//           <Flex
//             transition={'all .3s ease'}
//             transform={'translateX(-10px)'}
//             opacity={0}
//             _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//             justify={'flex-end'}
//             align={'center'}
//             flex={1}>
//             <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
//           </Flex>
//         </Stack>
//       </Link>
//     );
//   };
  
//   const MobileNav = () => {
//     return (
//       <Stack
//         bg={useColorModeValue('white', 'gray.800')}
//         p={4}
//         display={{ md: 'none' }}>
//         {NAV_ITEMS.map((navItem) => (
//           <MobileNavItem key={navItem.label} {...navItem} />
//         ))}
//       </Stack>
//     );
//   };
  
//   const MobileNavItem = ({ label, children, href }: NavItem) => {
//     const { isOpen, onToggle } = useDisclosure();
  
//     return (
//       <Stack spacing={4} onClick={children && onToggle}>
//         <Flex
//           py={2}
//           as={Link}
//           href={href ?? '#'}
//           justify={'space-between'}
//           align={'center'}
//           _hover={{
//             textDecoration: 'none',
//           }}>
//           <Text
//             fontWeight={600}
//             color={useColorModeValue('gray.600', 'gray.200')}>
//             {label}
//           </Text>
//           {children && (
//             <Icon
//               as={ChevronDownIcon}
//               transition={'all .25s ease-in-out'}
//               transform={isOpen ? 'rotate(180deg)' : ''}
//               w={6}
//               h={6}
//             />
//           )}
//         </Flex>
  
//         <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//           <Stack
//             mt={2}
//             pl={4}
//             borderLeft={1}
//             borderStyle={'solid'}
//             borderColor={useColorModeValue('gray.200', 'gray.700')}
//             align={'start'}>
//             {children &&
//               children.map((child) => (
//                 <Link key={child.label} py={2} href={child.href}>
//                   {child.label}
//                 </Link>
//               ))}
//           </Stack>
//         </Collapse>
//       </Stack>
//     );
//   };
  
//   interface NavItem {
//     label: string;
//     subLabel?: string;
//     children?: Array<NavItem>;
//     href?: string;
//   }
  
//   const NAV_ITEMS: Array<NavItem> = [
//     {
//       label: 'Home',
//       href:'/'
//     },
//     {
//       label: 'About',
//       children: [
//         {
//           label: 'Upload Your Blog',
//           subLabel: '',
//           href: '/post',
//         },
//         {
//           label: 'Search',
//           subLabel: '',
//           href: '/searchResult',
//         },
//       ],
//     },
//     {
//       label: 'Contact',
//       href: '/contact',
//     }
//   ];

import React from "react";
import {
  Avatar,
  Flex,
  HStack,
  Text,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const data = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <Box>
      <Flex
        as="nav"
        justify="space-between"
        alignItems={"center"}
        padding="1rem"
        bg="whiteAlpha.800"
        color="white"
        w={"100%"}
        zIndex={"200"}
        border={'8px solid #f5db1b'}
        boxShadow={'dark-lg'}
        fontFamily={'mono'}
        
      >
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">
            <Link onClick={() => handleClick("/")} textShadow={'2px 1px black'} textColor={'#f5db1b'}>My Blog</Link>
            <Spacer/>
          </Text>
          </Flex>

        {token ? (
          
          <Box w='60%' h={'full'}> 
            <Box>
            <HStack position={'absolute'}  w='70%'  fontSize={'xl'} justify={'space-around'}>
              <Link color={'black'}  ml={'20vh'} mt={'3%'} onClick={() => handleClick("/createBlog")}>Create blog</Link>
            </HStack>
            <HStack position={'absolute'}  w='35%'  fontSize={'xl'} justify={'space-evenly'} >
              <Link color={'black'} ml='50' mt={'5%'} onClick={() => handleClick("/searchResult")}>Search page</Link>
            </HStack>


              <Link 
                onClick={() => handleClick("/profile")}
                mr={4}
              >
                <Avatar
                  ml={'90%'}
                  name="Dan Abrahmov"
                  src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imgProfile}`}
                />
              </Link>
            </Box>
            <Box>
              <Text ml={'90%'} fontWeight={"bold"} color={'black'}>{data.username}</Text>
            </Box>
          </Box>
        ) : (
          <>
            <HStack mr={4} verticalAlign={"center"}>
              <Link
                onClick={() => handleClick("/register")}
                mr={4}
                align={"center"}
                textColor={'black'}
                fontWeight={'bold'}
              >
                Sign Up
              </Link>
              <Link
                onClick={() => handleClick("/login")}
                mr={4}
                align={"center"}
                textColor={'black'}
                fontWeight={'bold'}
              >
                Login
              </Link>
            </HStack>
          </>
        )}
      </Flex>
    </Box>
  );
};
