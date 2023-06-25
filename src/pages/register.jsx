import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text, 
  Link
} from "@chakra-ui/react";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const SeePsw = () => {
    setShowPassword(!showPassword);
  };

  const RegisSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .min(10, "Phone number must be at least 10 characters")
      .required("Phone number is required"),

    username: Yup.string().required("Username is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
      .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password didn't match")
      .required("Password is required"),
  });
  const handleSubmit = async (data) => {
    data.FE_URL = "http://localhost:3000"
    try {
      const response = await Axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/userLogin");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisSchema}
      onSubmit={(value, action) => {
        console.log(value);
        handleSubmit(value);
        // action.resetForm();
      }}
    >
      {({ props }) => {
        return (
          <Box
            as={Form}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="120vh"
            bgColor={"white"}
            w={'auto'}
          >
            <Box
              p={8}
              maxWidth="500px"
              borderWidth={"20px"}
              borderColor={'#f5dc5d'}
              borderRadius="xl"
              boxShadow="dark-lg"
              bg={'white'}
            >
              <Box>
                <Heading mb={6} textAlign="center" textColor={"black"} fontFamily={"mono"}>
                  Create new account
                </Heading>
                <FormControl>
                  <FormLabel textColor={"black"} fontSize={'sml'} fontFamily={"mono"}>Email Address</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel textColor={"black"} fontSize={'sml'} fontFamily={"mono"}>Phone number</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="phone"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <FormControl>
                  <FormControl>
                    <FormLabel textColor={"black"} fontSize={'sml'} fontFamily={"mono"} >Username</FormLabel>
                    <ErrorMessage
                      component="div"
                      name="username"
                      style={{ color: "red" }}
                    />
                    <Input
                      as={Field}
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      mb={4}
                      bgColor={"white"}
                    />
                  </FormControl>
                  <FormLabel textColor={"black"} fontSize={'sml'} fontFamily={"mono"}>Password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    mb={4}
                    bgColor={"white"}
                  />

                  <FormLabel textColor={"black"} fontSize={'sml'} fontFamily={"mono"}>
                    Confirm your password
                  </FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your password"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
                <Checkbox
                  textColor={"black"}
                  isChecked={showPassword}
                  onChange={SeePsw}
                  mb={4}
                  fontFamily={"mono"}
                >
                  Show Password
                </Checkbox>
              </Box>
              <Button colorScheme="yellow" size="lg" width="full" type="submit" fontFamily={"mono"}>
                Sign up
              </Button>
              <Link href="login">
              <Text fontWeight={'semibold'} fontFamily={"mono"}> Have account? Login</Text>
              </Link>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};