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
  
  export const ChangePhone = () => {
    const data = useSelector((state) => state.user.value);
    const token = localStorage.getItem("token");
    console.log(data);
  
    const navigate = useNavigate();
    const onChangeIt = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    const handleSubmit = async (data) => {
      try {
        data.FE_URL = "http://localhost:3000";
        const response = await Axios.patch(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        console.log(response);
      } catch (error) {}
    };
  
    const ChangePhoneSchema = Yup.object().shape({
      currentPhone: Yup.string().required("Username is required"),
  
      newPhone: Yup.string().required("Username is required"),
    });
    return (
      <Formik
        initialValues={{
          currentPhone: "",
          newPhone: "",
        }}
        validationSchema={ChangePhoneSchema}
        onSubmit={(value, action) => {
          console.log(value);
          handleSubmit(value);
        }}
      >
        {(props) => {
          return (
            <Box as={Form} rounded={"lg"} boxShadow={"lg"} p={8}>
              <Heading textAlign={"center"} fontFamily={'mono'}textColor={'#f5db1b'} textShadow={'1px 1px black'}>Edit phone</Heading>
  
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel fontFamily={'mono'}>Current phone</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="currentPhone"
                    style={{ color: "red" }}
                  />
                  <Input as={Field} name="currentPhone" />
                </FormControl>
  
                <FormControl>
                  <FormLabel fontFamily={'mono'}>New phone</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="newPhone"
                    style={{ color: "red" }}
                  />
                  <Input as={Field} name="newPhone" />
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