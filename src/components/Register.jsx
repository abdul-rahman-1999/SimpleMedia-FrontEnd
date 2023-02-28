import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik";
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const formValidationSchema = yup.object({
    username:yup.string().required(),
    email:yup.string().required(),
    password:yup.string().required().min(5),
  })
  

function Register() {

    let navigate = useNavigate()
    const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
      initialValues:{
        username:'',
        email:'',
        password:'',
      },
      validationSchema : formValidationSchema,
      onSubmit:(newList) => {
        addUser(newList)
      }
  })

  let addUser = async(newList) => {

    try{
      const res = await axios.post(`https://simplemedia.onrender.com/api/auth/register`,newList)
      if(res.data){
        if (res.data.msg === "Registered Successfully") {
                      toast.success('Account Created Successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        })
                        // navigate("/sociogram/messenger")
                        localStorage.setItem("Authorization", res.data.token)
                        localStorage.setItem("email", res.data.user.email)
                  }else{
                              toast.error('Account Created Successfully', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                })
                            }
      }
     }catch(err){
      toast.error('Account Created Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
     }

}

  return <>
  
  <Box sx={{backgroundImage: `url(${"https://img.freepik.com/free-photo/full-shot-woman-reading-with-smartphone_23-2149629602.jpg?w=1380&t=st=1677518063~exp=1677518663~hmac=95806258cfbcd1d6c0f1048b2a455907cee0a02674c709a3b61cb0e99805d5af"})`,
  backgroundRepeat: "no-repeat",backgroundPosition:{xs:"right",sm:"top",md:"top"},backgroundSize:"cover",height:{xs:"100vh",md:"100vh"}}}>

  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",flexDirection:{xs:"column",sm:"row-reverse"},width:"100%",margin:"0px auto",height:"100vh"}}>
  <Box sx={{width:{xs:"80%",sm:"40%",md:"40%"}}}>
  </Box>

<Box sx={{padding:"50px 30px",width:{xs:"70%",sm:"40%",md:"400px"},
background: "white",
borderRadius: "16px",}}>

        <h4 style={{color:"#E15E27"}}>Register Now</h4>

        <form  onSubmit = {handleSubmit}>
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",gap:3}}>

        <TextField
         id="outlined-basic" 
          label="Full Name"
          variant="outlined"
          name="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          error = {touched.username && errors.username}
           helperText =  {touched.username && errors.username ? errors.username :null}
           />

        <TextField
         id="outlined-basic"
          label="Email"
           variant="outlined"
           name="email"
           value={values.email}
           onBlur={handleBlur}
           onChange={handleChange}
           type="text"
           error = {touched.email && errors.email}
            helperText =  {touched.email && errors.email ? errors.email :null}
            />
           
        <TextField
         id="outlined-basic"
          label="Password"
           variant="outlined"
           name="password"
           value={values.password}
           onBlur={handleBlur}
           onChange={handleChange}
           type="password"
           error = {touched.password && errors.password}
            helperText =  {touched.password && errors.password ? errors.password :null}
            />

        <Button type="submit" sx={{backgroundColor:"#E15E27",padding:"15px"}} variant="contained">Signup</Button>
        <ToastContainer />
        </Box>
        </form>
        <h5 style={{margin:"10px",color:"black",textAlign:"center"}}>Already have an Account <span style={{color:"#E15E27",cursor:"pointer"}} onClick={() => navigate('/')}>Click here to Login</span></h5>

</Box>
</Box>

  </Box>

  </>
}

export default Register