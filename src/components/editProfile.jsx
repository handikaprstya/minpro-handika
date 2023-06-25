import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Stack,
  useEditableControls,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export const EditProfile = () => {
  const data = useSelector((state) => state.user.value);
  console.log(data);

  const EditSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <Box as={Form}>
        <FormControl>
        <ButtonGroup size="sm">
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
        </FormControl>
      </Box>
    ) : (
      <Box>
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Box>
    );
  }
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={EditSchema}
      onSubmit={(value, actions) => {
        console.log(value);
      }}
    >
      {({ props }) => {
        return (
          <Box as={Form}>
            <Heading textAlign={"center"} textShadow={'1px 1px black'} fontFamily={'mono'} textColor={'#f5db1b'}>Edit profile</Heading>
            <Stack p={"5%"}>

              <FormControl>
                <FormLabel textColor={"black"} fontFamily={'mono'}>Username</FormLabel>
                <ErrorMessage
                  component="div"
                  name="username"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.username}
                  fontSize="md"
                  isPreviewFocusable={false}
                >
                  <HStack>
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Field as={EditableInput} />
                    <EditableControls />
                  </HStack>
                </Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"} fontFamily={'mono'}>Email</FormLabel>
                <ErrorMessage
                  component="div"
                  name="email"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.email}
                  fontSize="md"
                  isPreviewFocusable={false}
                >
                  <HStack>
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Field as={EditableInput} />
                    <EditableControls />
                  </HStack>
                </Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"} fontFamily={'mono'}>Phone number</FormLabel>
                <ErrorMessage
                  component="div"
                  name="phone"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.phone}
                  fontSize="md"
                  isPreviewFocusable={false}
                >
                  <HStack>
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Field as={EditableInput} />
                    <EditableControls />
                  </HStack>
                </Editable>
              </FormControl>

              <FormControl>
                <FormLabel textColor={"black"} fontFamily={'mono'}>Password</FormLabel>
                <ErrorMessage
                  component="div"
                  name="password"
                  style={{ color: "red" }}
                />
                <Editable
                  defaultValue={data.password}
                  fontSize="md"
                  isPreviewFocusable={false}
                >
                  <HStack>
                    <EditablePreview />
                    {/* Here is the custom input */}
                    <Field as={EditableInput} />
                    <EditableControls />
                  </HStack>
                </Editable>
              </FormControl>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};