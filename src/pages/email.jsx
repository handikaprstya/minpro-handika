import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    HStack, 
    Text
  } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { setValue } from "../redux/userSlice";

  export const EmailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogin = async (data) => {
      try {
        const response = await Axios.post(
          `https://minpro-blog.purwadhikabootcamp.com/api/auth/login`,
          data
        );
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        const { username, email, phone, imgProfile } = 
          response.data.isAccountExist;
          dispatch(setValue({username, email, phone, imgProfile}));
          console.log(response.data.isAccountExist);
          navigate("/");
      } catch(err) {
        console.log(err)
      }
      
    };
    const token = localStorage.getItem("token");
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
      email: Yup.string()
          .required('Email is required')
          .email('Invalid email format'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
        .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),

    });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(value, actions) => {
        console.log(value);
      }}
    >
      {({ props }) => {
        return (
          <Box
          as={Form}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgColor={"white"}
          >
            <Box
              p={8}
              maxWidth="500px"
              borderWidth={"15px"}
              borderColor={'#f5dc5d'}
              borderRadius="xl"
              boxShadow="dark-lg"
              bg={'#d6d4d0'}
            >
              <Box>
                <Flex justifyContent="center">
                <Text fontSize={'xl'} fontWeight={'extrabold'}>LOGIN EMAIL ACCOUNT</Text>
                  <Heading
                    mb={6}
                    textAlign="center"
                    textColor={"black"}
                    size={"4xl"}
                  >
                  </Heading>
                </Flex>
              
                <FormControl>
                  <FormLabel textColor={"black"}>Email</FormLabel>
                  <Stack spacing={4}>
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                    <InputGroup>

                      <Input
                        as={Field}
                        name="email"
                        type="text"
                        placeholder=" Enter your email"
                        color={"black"}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
                <HStack>
                  <Box>
                  <FormControl id="password" isRequired>
                  <FormLabel color={'black'}>Password</FormLabel>
                  <InputGroup>
                    <Input as={Field} type={showPassword ? 'text' : 'password'} name='password' border={"1px solid black"} placeholder='Enter your password' />
                    <ErrorMessage
                    component={"div"}
                    name='password'
                    style={{ color: "red"}}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                  </Box>
                </HStack>
              </Box>

              <Box mb={4}>
                <Flex gap={"60px"} justifyContent={"center"}>
                  <Flex gap={2}>
                    <Link href="/phone" fontWeight={'semibold'} color={"black"} mt={'5%'}>
                      Login with phone <ExternalLinkIcon mx="2px" />
                    </Link>
                    <Link href="/login"  fontWeight={'semibold'} color={"black"} mt={'5%'}>
                      Login with username <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                </Flex>
              </Box>

              <Button colorScheme="yellow" size="lg" width="full" type="submit">
                Sign In
              </Button>
              <Link href="/signup" size={'sm'} fontWeight={'semibold'} color={"black"} mt={'5%'}>
                      Do dot Have Account? Sign Up <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};