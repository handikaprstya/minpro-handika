import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useSelector } from "react-redux";
  import * as Yup from "yup";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import Axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  export const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const data = useSelector((state) => state.user.value);
    const token = localStorage.getItem("token");
    console.log(data);
  
    const navigate = useNavigate();
    const onChangeIt = () => {
      localStorage.removeItem("token");
      navigate("/userLogin");
    };
  
    const handleSubmit = async (data) => {
      try {
        data.FE_URL = "http://localhost:3000";
        const response = await Axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        console.log(response);
      } catch (error) {}
    };
  
    const ChangePassSchema = Yup.object().shape({
      currentPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
        .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(/^(?=.*[A-Z])/, "Must contain at least one Uppercase character")
        .matches(/^(?=.*(\W|_))/, "Must contain at least one symbol"),
  
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password didn't match")
        .required("Password is required"),
    });
    return (
      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ChangePassSchema}
        onSubmit={(value, action) => {
          console.log(value);
          handleSubmit(value);
        }}
      >
        {(props) => {
          return (
            <Box as={Form} rounded={"lg"} boxShadow={"lg"} p={8}>
              <Heading textAlign={"center"} fontFamily={'mono'} textColor={'#f5db1b'} textShadow={'1px 1px black'}>Edit password</Heading>
  
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel fontFamily={'mono'}>Current password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="currentPassword"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontFamily={'mono'}>New password</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="password"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormControl>
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    style={{ color: "red" }}
                  />
                  <FormLabel fontFamily={'mono'}>Confirm password</FormLabel>
                  <Input
                    as={Field}
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                  />
                  <Flex justifyContent={"center"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </Flex>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    fontFamily={'mono'}
                    isDisabled={!props.dirty}
                    onClick={onChangeIt}
                    type={"submit"}
                    loadingText="Submitting"
                    size="lg"
                    bg={"#f5db1b"}
                    color={"black"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Change it!
                  </Button>
                </Stack>
              </Stack>
            </Box>
          );
        }}
      </Formik>
    );
  };