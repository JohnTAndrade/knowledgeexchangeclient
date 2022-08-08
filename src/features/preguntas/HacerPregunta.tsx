import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Pregunta } from "../../app/models/Pregunta";
import { RootState } from "../../app/store/configureStore";
import "./HacerPregunta.css"
import { increment, login, getAll } from "../../app/store/productSlice";

export default function HacerPregunta(prop:any)
{

   

    const [pregunta, setPregunta] = useState<Pregunta>({ preguntaID:0, nombre:"", apellido:"", titulo:"", texto:"", fechaCreacion:"", usuarioID:0, tags:[],tagIds:[] });
    const user = useSelector((state: RootState) => state.counter.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [redirect, setredirect] = useState<boolean>(false);

 

  

function createPreguntaHandler(e:any)
{
    e.preventDefault();

    var xhr = new XMLHttpRequest(); 
    
    var url = 'https://tesisbe.azurewebsites.net/api/Preguntas';
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        dispatch(getAll(""));
        setredirect(true);
    }
    else if(this.readyState == 4 && this.status == 400)
    {           

    }

    }




    var value = (document.getElementById("textareaId") as HTMLInputElement).value;
    var ptitulo = (document.getElementById("ptitulo") as HTMLInputElement).value;
    var usuarioID = user.id;
    var tags = [40 , 14, 23];
        
        var texto = value;

    var data = {usuarioID:usuarioID,titulo: ptitulo, texto : value, tagids:tags};
    // Sending our request 
    xhr.send(JSON.stringify(data));

    
}




    return (
    <div id="hacerPregunta">
        <div>
        <h1 style={{paddingTop:"25px"}}> Formular una pregunta</h1>
        <input type="text" placeholder="Ingrese Título" id="ptitulo" style={{marginTop:"25px"}}/>     

        {redirect&& <Navigate to="/" />}
        
        { user.id!==0&&<div style={{margin:"2px", marginTop:"55px"}}>
        <p style={{fontSize:"20px", fontWeight:"bold", marginRight:"70%"}}>Tu Pregunta</p>
        <textarea id="textareaId" name="w3review" rows={10} cols={100} style={{backgroundColor:"#EEE"}}></textarea>
        <br/>
        <Button onClick={createPreguntaHandler} variant="contained" size="small"  style={{marginTop:"10px",backgroundColor:"#F90", marginBottom:"25px", color:"#000", fontWeight:"bold", padding:"8px", fontSize:"16px", textTransform:"capitalize",  marginRight:"68%"}}>Enviar Pregunta </Button>
        </div>
       }
        
        
    </div>
    
    

  </div>
    
    
)
}