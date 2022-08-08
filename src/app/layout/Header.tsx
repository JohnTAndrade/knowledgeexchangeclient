import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from '../../images/logox.png'
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profile/ProfilePage";
import Button from "@mui/material/Button";
import  "./Header.css"
import { Link } from "react-router-dom";
import LoginPage from "../../features/login/login";
import RegistroPage from "../../features/home/registro/RegistroPage";
import  "../../features/home/registro/registro.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { useState } from "react";
import { increment, login, getAll } from "../../app/store/productSlice";
import { Container } from "@mui/material";
import PreguntaDetail from "../../features/preguntas/PreguntaDetail";
import HacerPregunta from "../../features/preguntas/HacerPregunta";
import Registrase from "../../features/preguntas/registarse";


export default function Header()
{
  const user = useSelector((state: RootState) => state.counter.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  

  const [redirect, setredirect] = useState<boolean>(false);


  function gotohome(e:any)
  {
    e.preventDefault();
    dispatch(getAll(""));
    navigate("./")

  }

  function logout(e:any)
  {
    e.preventDefault();
    dispatch(login({nombre:"", apellido:"", token:"", id:0, usuarioName:""}));
    navigate("./")

  }

  let activeStyle = {
    
    backgroundColor:"#F90", margin:"5px", color:"#000", fontWeight:"bold", padding:"5px",
    textDecoration:"none"
  };

  let inactiveStyle = {
    textDecoration: "underline",
  };

    return(
        <>
        {redirect&& <Navigate to="/"  />}
        <div style={{
            display: "flex",
            background: 'black',
            padding: '5px 0 5px 5px',
            fontSize: '12px',
            justifyContent: "space-evenly"
        }}>
          <div>
            <div onClick={gotohome} style={{cursor:"pointer"}} >
                    
                    <img src={logo} style={{height:"70px", marginLeft:"200px", marginTop:"5px"}}/>
               </div>
                  </div>
                  
            
            <SearchBar></SearchBar>
            <div style={{ width:"300px",  padding:"15px", marginTop:"15px"}}>
               {user.id === 0 ? <div> <NavLink to={'/login'} className={"registro"} > Iniciar sesión </NavLink>
                <NavLink to={'/registro'} className={"registro"}  > Registrarse </NavLink> </div> 
                :<div>  <span style={{color:"white", marginRight:"25px", fontWeight:"bold", fontSize:"16px", textTransform:"capitalize"}}>Hola {user.usuarioName}</span>
                  <Button variant="contained" size="small" onClick={logout} style={{backgroundColor:"#F90", margin:"0", color:"#000", fontWeight:"bold", padding:"4px", fontSize:"11px", textTransform:"capitalize"}}>Logout </Button> </div>      
              }

              
              

            </div>
        </div>

        <Container sx={{ maxWidth:'950px'  }} maxWidth={false} style={{ backgroundColor: '#FFF' }}>

          
            
        
          <div style={{  maxWidth:"900px", minHeight:"800px",minWidth:"900px"}}>
          <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/profile' element={<ProfilePage/>}> </Route>
        <Route path='/login' element={<LoginPage/>}> </Route>
        <Route path='/registro' element={<Registrase/>}> </Route>
        <Route path='/pregunta' element={<HacerPregunta/>}> </Route>
        <Route path='/preguntadetail' element={<PreguntaDetail/>}> 
        <Route path=":id" element={<PreguntaDetail/>} />
        </Route>
      </Routes>
 

          </div>
          

        </Container>


<div style={{
            display: "flex",
            background: 'black',
            padding: '5px 0 5px 5px',
            fontSize: '20px',
            minHeight:"80px"
        }}>jojojo </div>

</>
    )
}