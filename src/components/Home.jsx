import React,{ useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import { format } from 'timeago.js';
import AddPost from './AddPost';
import AuthContext from '../components/Context/AuthContext'
import Badge from '@mui/material/Badge';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import NavBar from './NavBar';
import { io } from "socket.io-client";

function Home() {

    const [post,setPost] = useState([])    
    const [socket,setSocket] = useState(null)
    const [like,setLike] = useState(false)
    let { user,setUser2 } = useContext(AuthContext)

    useEffect(() => {
      setSocket(io("https://simplemedia.onrender.com/"));
    },[])

    useEffect(() => {
      if(user?.username){
        socket?.emit("newUser", user?.username);
        socket?.on("getUsers", users => {
          //console.log(users)
        })
      }else{
        setUser2(true)
      }
    }, [socket, user?.username]);

    
    const getPost = async() => {
        try{
          if(user?.username){
            const posts = await axios.get(`https://simplemedia.onrender.com/api/posts/`)
            setPost(posts.data)
          }else{
            setUser2(true)
          }
        }catch(err){
        console.log(err)
        }
      }
    
    useEffect(() => {getPost()},[user?.username])

    const handleNotification = (receiver,img) => {
   
      if(user?.username){
        setLike(true);
        socket.emit("sendNotification", {
          senderName: user?.username,
          receiverName: receiver,
          img : `https://simplemedia.onrender.com/${img}`,
        });
      }else{
        setUser2(true)
      }

    };


   const deleteList = async(id) => {
  
    try{
      const res = axios.delete("https://simplemedia.onrender.com/api/posts/" + id)
      .then(() => getPost())
    }catch(err){
    console.log(err)
    }

   }


  return <>
  <NavBar socket={socket}/>
  <Box sx={{width:{xs:"90%",sm:"80%",md:"90%"},margin:"0px auto"}}>

<AddPost/>

{
 post.length > 0 ? <Box sx={{width:{xs:"100%",sm:"100%",md:"40%"},padding:{xs:"0px",sm:"0px",md:"20px"},height:{xs:"75vh",sm:"65vh",md:"85vh"},overflowY:"scroll",scrollbarWidth:"thin",scrollbarColor:"rebeccapurple green",margin:"0px auto"}}>
 {
  post.map((e) => 
    (
      <Paper key={e._id} sx={{marginTop:"25px"}}>
 <Box
      component="img"
      sx={{
          margin:0,
        objectFit:'cover',
        objectPosition:"top",
        width: "100%",
        height:"350px"
      }}
      alt="The house from the offer."
      src={`https://simplemedia.onrender.com/${e?.img}`}
      />

      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px"}}>

          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2}}>
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
      <p style={{color:"#27aae1",fontWeight:500}}>{e.username}</p>
          </Box>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:4}}> 

            {
              like  ?  (<p><Badge onClick={() => setLike(!like)}><ThumbUpIcon sx={{color:"#8dc63f"}}/></Badge></p>) : (<p><Badge onClick={() => handleNotification(e.username,e.img)}><ThumbUpIcon sx={{color:"grey"}}/></Badge></p>)
            }
          
          </Box>

      </Box>

      <p style={{padding:"0px 20px 0px 20px",margin:0,color:"#939598",fontSize:"12px"}}>{format(e.createdAt)}</p>
      <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
      <p style={{padding:"15px 20px 15px 20px",margin:0,fontSize:"14px",lineHeight:"22px",textAlign:"justify",fontWeight:500}}>{e.desc}</p>
      <p style={{padding:"15px 20px 15px 20px",margin:0}} onClick={() => deleteList(e._id)}><RestoreFromTrashIcon sx={{color:"#E15E27"}}/></p>
      </Box>
      
      <Divider sx={{width:"90%",margin:"0px auto"}}/>

 </Paper>
    )
  )
 }
</Box>
:
<Box>
 <p style={{textAlign:"center",margin:"40px"}}>There is No Posts, lets Add Your First Post as Best Post...</p>
</Box>
}

</Box>

  </>
}

export default Home