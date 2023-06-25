import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
  } from "@chakra-ui/react";
  
  import { useSelector } from "react-redux";
  import * as Yup from "yup";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import Axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  export const ChangeEmail = () => {
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
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        console.log(response);
      } catch (error) {}
    };
  
    const ChangeEmailSchema = Yup.object().shape({
      currentEmail: Yup.string().required("Email is required"),
  
      newEmail: Yup.string().required("New Email is required"),
    });
    return (
      <Formik
        initialValues={{
          currentEmail: "",
          newEmail: "",
        }}
        validationSchema={ChangeEmailSchema}
        onSubmit={(value, action) => {
          console.log(value);
          handleSubmit(value);
        }}
      >
        {(props) => {
          return (
            <Box as={Form} rounded={"lg"} boxShadow={"lg"} p={8}>
              <Heading textAlign={"center"} fontFamily={'mono'} textShadow={'1px 1px black'} textColor={'#f5db1b'}>Edit Email</Heading>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel fontFamily={'mono'}>Current Email</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="currentEmail"
                    style={{ color: "red" }}
                  />
                  <Input as={Field} name="currentEmail" />
                </FormControl>
  
                <FormControl>
                  <FormLabel fontFamily={'mono'}>New Email</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="newEmail"
                    style={{ color: "red" }}
                  />
                  <Input as={Field} name="newEmail" />
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