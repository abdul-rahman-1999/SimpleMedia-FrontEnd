import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthContext from '../components/Context/AuthContext'
import axios from 'axios';

function AddPost() {

    const [desc,setDesc] = useState("")
    const [image,setImage] = useState("")
    const { user } = useContext(AuthContext)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image)
        formData.append('desc', desc)
        formData.append('username', user?.username)
        
        try{
            const res = await axios.post(`https://simplemedia.onrender.com/api/posts/`,formData)
            window.location.reload(false);
           }catch(err){
            console.log(err)
           }
    
    }
  

  return <>
  
  <Paper sx={{margin:{xs:"20px auto",sm:"20px auto",md:"20px auto"},padding:"15px",display:"flex",gap:2,height:"170px",width:"300px"}}>

    <Box>
    <Box
        component="img"
        sx={{
            margin:0,
          objectFit:'cover',
          objectPosition:"top",
          width: "50px",
          height:"50px",
          borderRadius:"50%"
        }}
        alt="The house from the offer."
        src="https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
        />
    </Box>

<Box sx={{width:"80%"}}>

<TextField label="Enter Description" onChange={(e) => setDesc(e.target.value)} style={{width:"100%"}}/>
  <br/>
   <TextField
   type="file"
   onChange={(e) => setImage(e.target.files[0])} sx={{marginTop:"12px",width:"100%"}}
   />
  <Button sx={{marginTop:"12px",width:"100%",backgroundColor:"#E15E27"}} variant="contained" onClick={handleSubmit}>Post</Button>
  

</Box>

  </Paper>

  </>
}

export default AddPost