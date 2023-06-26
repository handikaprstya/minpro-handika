import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ForgotPsw } from "./pages/forgotpsw";
import { RegisterPage } from "./pages/register";
import { LandingPage } from "./pages/main";
import { Contact } from "./pages/contact";
import { EmailPage } from "./pages/email";
import { PhoneLogin } from "./pages/phone";
import { Validation } from "./pages/verification";
import { ProfilePage }  from "./pages/profile";
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { setValue } from "./redux/userSlice";
import { useEffect } from "react";
import { ResetPsw } from "./pages/newPassword";
import { NavbarPage } from "./pages/NavbarPage";
import { CreateBlog } from "./pages/createBlog";
import { BlogDetail } from "./pages/blogDetail";
import { SearchResult } from "./pages/searchResult";
import { DetailPage } from "./pages/detailPage";
import { UserLogin } from "./pages/userlogin";
import { EditProfile } from "./components/editProfile";
import { MyBlog } from "./components/myBlog";



  const router = createBrowserRouter([
    { path: "/", element: <NavbarPage/>,
    children: [
      { path: "/", element: <LandingPage/> },
      { path: "/profile", element: <ProfilePage/> },
      { path: "/createBlog", element: <CreateBlog/> },
      { path: "/blogDetail", element: <BlogDetail/> },
      { path: "/searchResult", element: <SearchResult/> },      
      { path: "/detailPage/:id", element: <DetailPage/> },
      {path:"/contact", element:<Contact/>},
    ]
  },



       {path:"/email", element:<EmailPage/>},
       {path:"/phone", element:<PhoneLogin/>},



    { path: "/register", element: <RegisterPage/> },
    { path: "/verification/:token", element: <Validation/> },
    { path: "/verification-change-email/:token", element: <Validation/> },
    { path: "/login", element: <UserLogin/> },
    {path: "/phoneLogin", element: <PhoneLogin/> },
    { path: "/reset-password/:token", element: <ResetPsw/> },
    { path: "/pswForgot", element: <ForgotPsw/> },
    { path: "/editProfile", element: <EditProfile/> },
    { path: "/myBlog", element: <MyBlog/> },
  

])


  function App() {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const keepLogin = async() => {
      try{
        const response =  await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", { 
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        })
        const { username, email, phone, imgProfile } = response.data
        dispatch(setValue({ username,email,phone,imgProfile }))
        console.log(response.data);
      }
      catch(err){
        console.log(err);
      }
    }
    useEffect(() => {
        token ? keepLogin() : console.log('Sign in first');
    },[])
  
    return(
      <div>
       
        <RouterProvider router={router}/>
      </div>

)
}

export default App;
