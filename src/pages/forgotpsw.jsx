import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import  Axios  from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export const ForgotPsw = () => {
  const { token } = useParams()
  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const handleSubmit = async (data) => {
    try {
      const response = await Axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ForgotSchema}
      onSubmit={(value, action) => {
        console.log(value);
        handleSubmit(value);
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
              borderWidth={"10px"}
              borderColor={'#f5dc5d'}
              borderRadius="md"
              boxShadow="lg"
            >
              <Box>
                <Heading mb={6} textAlign="center" textColor={"#f5dc5d"} textShadow={'2px 2px black'} fontFamily={'mono'}>
                  Forgot your password
                </Heading>
                <FormControl>
                  <FormLabel textColor={"black"} fontFamily={'mono'}>Email Address</FormLabel>
                  <ErrorMessage
                    component="div"
                    name="email"
                    style={{ color: "red" }}
                  />
                  <Input
                    as={Field}
                    name="email"
                    type="text"
                    borderColor={'black'}
                    placeholder="Enter your email"
                    mb={4}
                    bgColor={"white"}
                  />
                </FormControl>
              </Box>
              <Button colorScheme="yellow" size="lg" width="full" type="submit" fontFamily={'mono'}>
                Sign In
              </Button>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};