import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Pregunta } from "../../app/models/Pregunta";
import { RootState } from "../../app/store/configureStore";
import "./HacerPregunta.css"
import { increment, login, getAll } from "../../app/store/productSlice";

export default function Registrase(prop:any)
{

   

    const [pregunta, setPregunta] = useState<Pregunta>({ preguntaID:0, nombre:"", apellido:"", titulo:"", texto:"", fechaCreacion:"", usuarioID:0, tags:[],tagIds:[] });
    const user = useSelector((state: RootState) => state.counter.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [redirect, setredirect] = useState<boolean>(false);

 

  

    function registroHandler(e:any)
    {
        e.preventDefault();

        

        var xhr = new XMLHttpRequest(); 
    
    var url = 'https://tesisbe.azurewebsites.net/api/usuarios/CrearUsuario';
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            setredirect(true);
            
        }
        else if(this.readyState == 4 && this.status == 400)
        {            

        } 
    }

        var nombre = (document.getElementById("rnombre") as HTMLInputElement).value;
        var apellido = (document.getElementById("rapellido") as HTMLInputElement).value;
        var mail = (document.getElementById("rmail") as HTMLInputElement).value;
        var username = (document.getElementById("rusername") as HTMLInputElement).value;
        var fecha = (document.getElementById("rfecha") as HTMLInputElement).value;
        var pass = (document.getElementById("rpass") as HTMLInputElement).value;
        var pass2 = (document.getElementById("rpass2") as HTMLInputElement).value;
        var pais = (document.getElementById("rpais") as HTMLInputElement).value;

    var data = {username:username,password: pass, confirmarPassword: pass2, usuarioName: username, email: mail, nombre:nombre, apellido: apellido,
        fechaDeNacimiento: fecha, pais:pais
    };
    // Sending our request 
    xhr.send(JSON.stringify(data));


    }




    return (
    <div id="hacerPregunta">
        {redirect&& <Navigate to="/" />}
        <div id="formx">
        <h1> Registro</h1>
        <input type="text" placeholder="Ingrese Nombre" id="rnombre"/>     

        <input type="text" placeholder="Ingrese Apellido" id="rapellido"/>
        
        <input type="email" placeholder="Correo ej:  juan123@Gmail.com" id="rmail" />

        <input type="text" placeholder="Nombre de Usuario" id="rusername"/>
        <input type="text" placeholder="País" id="rpais"/>

        <label >Fecha de Nacimiento:</label>
        <input type="date"  name="trip-start" id="rfecha"/>
        
        <input type="password" placeholder="Ingresar Contraseña" id="rpass"/>
        <input type="password" placeholder="Confirmar Contraseña" id="rpass2"/>
        <p className="acuerdo"> Estoy de acuerdo con los terminos y condiciones</p>
        <button type="submit" className="btnloginx"  onClick={registroHandler}>Registrarse</button>
        
        
    </div>
    
    

  </div>
    
    
)
}