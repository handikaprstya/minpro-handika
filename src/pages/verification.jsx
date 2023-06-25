import { Box, Button, ButtonSpinner, Heading } from "@chakra-ui/react"
import  Axios  from "axios"
import { useNavigate, useParams } from "react-router-dom"

export const Validation = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const handleSubmit = async() => {
        try{
            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/verify",{},{
                headers: { Authorization: `Bearer ${token}`}
              })
              navigate("/")
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgColor={"black"}
      gap={"20px"}
      >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={"20px"}
        borderRadius="md"
        boxShadow="lg"
      >
        <Box>
          <Heading mb={6} textAlign="center" textColor={"white"}>
            Verify your account
          </Heading>
          <Box>
          <Button colorScheme="blue" size="lg" width="full" type= "submit" mb={"10%"} onClick={handleSubmit}>
          Verify
        </Button>
            <ButtonSpinner color="white"/>
          </Box>
        </Box>
      </Box>
    </Box>
        </>
    )
}