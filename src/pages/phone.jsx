import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import  Axios  from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setValue } from "../redux/userSlice";

export const PhoneLogin = () => {
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
      dispatch(setValue({ username, email, phone, imgProfile }));
      console.log(response.data.isAccountExist);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };
  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digit")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  });
  return (
    <Formik
      initialValues={{
        phone: "",
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
              borderRadius="md"
              boxShadow="lg"             
            >
              <Box>
                <Flex justifyContent="center">
                <Text fontSize={'xl'} fontWeight={'extrabold'}>LOGIN PHONE NUMBER</Text>
                  <Heading
                    mb={6}
                    textAlign="center"
                    textColor={"black"}
                    size={"4xl"}
                  >
                  </Heading>
                </Flex>
              
                <FormControl>
                  <FormLabel textColor={"black"}>Phone number</FormLabel>
                  <Stack spacing={4}>
                  <ErrorMessage
                    component="div"
                    name="phone"
                    style={{ color: "red" }}
                  />
                    <InputGroup>
                      <InputLeftAddon children="+62" />
                      <Input
                        as={Field}
                        name="phone"
                        type="number"
                        placeholder=" Enter your phone number"
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
                    <Link href="/email">
                      <Text fontWeight={'semibold'} color={"black"} mt={'5%'}>
                      Login with email <ExternalLinkIcon mx="2px" />
                      </Text>
                    </Link>
                    <Link href="/login" isExternal fontWeight={'semibold'} color={"black"} mt={'5%'}>
                      Login with username <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                </Flex>
              </Box>

              <Button colorScheme="yellow" size="lg" width="full" type="submit">
                Sign In
              </Button>
              <Link href="/signup" isExternal fontWeight={'semibold'} color={"black"}>
                      Do not have account? Sign Up
              </Link>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};