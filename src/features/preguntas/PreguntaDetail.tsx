import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pregunta } from "../../app/models/Pregunta";
import { Respuesta } from "../../app/models/Respuesta";
import { RootState } from "../../app/store/configureStore";
import {Editor, EditorState} from "draft-js";
import 'draft-js/dist/Draft.css';
import MyEditor from "../../app/util/MyEditor";
import 'draft-js/dist/Draft.css';
import { Button } from "@mui/material";


export default function PreguntaDetail(prop:any)
{ 
    let query = new URLSearchParams(window.location.search).get('id');

    const [pregunta, setPregunta] = useState<Pregunta>({ preguntaID:0, nombre:"", apellido:"", titulo:"", texto:"", fechaCreacion:"", usuarioID:0, tags:[],tagIds:[] });
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    const user = useSelector((state: RootState) => state.counter.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

 

  useEffect(() => {

    let url = 'https://tesisbe.azurewebsites.net/api/Preguntas/'+query;
    let url2 = 'https://tesisbe.azurewebsites.net/api/Respuestas/'+query;

    fetch(url)
        .then(response => response.json())
        .then(data => setPregunta(data))
     
        fetch(url2)
        .then(response => response.json())
        .then(data => setRespuestas(data))


}, [])

    function createPreguntaHandler(e:any)
    {
        e.preventDefault();

        
        var value = (document.getElementById("textareaId") as HTMLInputElement).value;
        
        var xhr = new XMLHttpRequest(); 
    
        var url = 'https://tesisbe.azurewebsites.net/api/Respuestas';
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            (document.getElementById("textareaId") as HTMLInputElement).value = "";
            
            let url2 = 'https://tesisbe.azurewebsites.net/api/Respuestas/'+query;
    fetch(url2)
        .then(response => response.json())
        .then(data => setRespuestas(data))
            
            
        }
        else if(this.readyState == 4 && this.status == 400)
        {           

        }
    
        }

        

        var usuarioID = user.id;
        var preguntaId = query;
        var texto = value;

    var data = {usuarioID:usuarioID,preguntaId: preguntaId, texto : texto};
    // Sending our request 
    xhr.send(JSON.stringify(data));

   
}


    return (
    <div>
        <div id="preguntaHeader" style={{borderBottom: "4px solid #BBB", backgroundColor:"white"}}>
            <h1>{pregunta.titulo}</h1>
            <p>Fecha de creación: {new Date(pregunta.fechaCreacion).toLocaleDateString('es-MX')}</p>
        </div>

        <div id="preguntaHeader" style={{borderBottom: "2px solid #BBB", backgroundColor:"white"}}>
            <p>{pregunta.texto}</p>
            <p style={{float:"right"}}>Creada por: <span style={{fontWeight:"bold"}}>{pregunta.nombre +" "+pregunta.apellido}</span></p>
        <div style={{clear:"both"}}></div>
        </div>
        <div>
            <h2>{respuestas.length} Respuestas</h2>
        </div>

        {respuestas.map(product => (
    
        <div style={{borderBottom: "1px solid black", backgroundColor:"white", marginTop:"25px", paddingBottom:"20px"}}> 
        <div style={{textAlign:"left"}} dangerouslySetInnerHTML={{__html: product.texto.replace(/\n/g, "<br />")}} />
        
        <div style={{float:"right"}}>
        <p style={{margin:"2px", marginTop:"15px"}}>Creada por: <span style={{fontWeight:"bold"}}>{product.nombre +" "+product.apellido}</span></p>
       
        <p style={{margin:"5px"}}>Fecha de creación: <b> {new Date(product.fechaCreacion).toLocaleDateString('es-MX')}</b></p>
        </div>
        <div style={{clear:"both"}}></div>
        </div>  
        ))}


       { user.id!==0&&<div style={{margin:"2px", marginTop:"55px"}}>
        <p style={{fontSize:"20px", fontWeight:"bold", marginRight:"70%"}}>Tu Respuesta</p>
        <textarea id="textareaId" name="w3review" rows={8} cols={100} style={{backgroundColor:"#EEE"}}></textarea>
        <br/>
        <Button onClick={createPreguntaHandler} variant="contained" size="small"  style={{marginTop:"10px",backgroundColor:"#F90", marginBottom:"25px", color:"#000", fontWeight:"bold", padding:"8px", fontSize:"16px", textTransform:"capitalize",  marginRight:"72%"}}>Responder </Button>
        </div>
       }


    
    

  </div>
    
    
)
}