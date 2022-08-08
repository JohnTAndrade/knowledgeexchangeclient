import { useEffect, useState } from "react";
import { Pregunta } from "../../app/models/Pregunta";
import PreguntaCard from "../preguntas/PreguntasCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store/configureStore"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function HomePage(prop: any)
{

    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

    const preguntasx = useSelector((state: RootState) => state.counter.Preguntas);
    let navigate = useNavigate();

   /*

    useEffect(() => {

        let url = 'https://tesisbe.azurewebsites.net/api/Preguntas';

        if(!prop === null)
        {
            alert(prop);
        }
        

        fetch(url)
            .then(response => response.json())
            .then(data => setPreguntas(data))
    }, [])

    */

    function gopreguntadetail(e:any)
    {
        e.preventDefault();
        navigate("/pregunta");
    }


    return(<>
    <div style={{borderBottom: "4px solid #BBB", backgroundColor:"white"}}>
    <div style={{float:"left", marginLeft:"115px", marginTop:"18px", fontSize:"20px",fontWeight:"bold"}} >
        <p>Últimas Preguntas</p>
   </div>

   <div style={{float:"right", marginRight:"105px", marginTop:"25px"}} >
   <Button onClick={gopreguntadetail} variant="contained" size="small"  style={{backgroundColor:"#F90", marginBottom:"25px", color:"#000", fontWeight:"bold", padding:"7px", fontSize:"14px", textTransform:"capitalize"}}>Hacer una pregunta </Button>
   </div>
   <div style={{clear:"both"}} ></div>


    </div>
    
    {preguntasx.map(product => (
        
            <PreguntaCard pregunta={product} />
        
    ))}</>)
}