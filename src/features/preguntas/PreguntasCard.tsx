import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Pregunta } from "../../app/models/Pregunta"


interface Props {
    pregunta: Pregunta
}

export default function PreguntaCard({ pregunta }: Props) {

  let navigate = useNavigate();

  function gotodetails(e:any)
  {
    e.preventDefault();
    var value = e.currentTarget.value;    
    navigate("/preguntadetail?id="+value);

  }
    return (<div>
     <Card sx={{ minWidth: 275 }} style={{margin:"5px"}}>
      <CardContent>
      <CardActions>
        <Button size="small" onClick={gotodetails}  value={pregunta.preguntaID}>{pregunta.titulo}</Button>
      </CardActions>
        
        
        <div style={{float:"left", marginTop:"25px"}}>
        {pregunta.tags === null?<div></div>:pregunta.tags.map(tag => (
        
        <span style={{margin:"5px"}}>
        <Button size="small" variant="contained"  style={{fontSize:"10px", padding:"3px", backgroundColor:"#F90", color:"black"}}>{tag.nombreTag}  </Button>
        </span> 
        ))}
        </div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{float:"right", marginTop:"5px"}}>

        Creado por: <b> {pregunta.nombre} {pregunta.apellido}</b> <br/>   Fecha: <b> {new Date(pregunta.fechaCreacion).toLocaleDateString('es-MX')}</b>
        </Typography>
        <div style={{clear:"both"}}></div>
        
        <input id="prodId" name="prodId" type="hidden" ></input>
      </CardContent>
      
    </Card>
    </div>)
}