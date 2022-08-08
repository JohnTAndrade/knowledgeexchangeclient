import { useDispatch } from "react-redux";
import { LoginResult } from "../../app/models/loginResult";
import "./login.css";
import { increment, login } from "../../app/store/productSlice";
import { RootState } from "../../app/store/configureStore";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage()
{

    const dispatch = useDispatch();
    const [redirect, setredirect] = useState<boolean>(false);
    const [message, setmessage] = useState<string>("");



    function loginx(e:any)
    {
        e.preventDefault();

    var xhr = new XMLHttpRequest(); 
    
    var url = 'https://tesisbe.azurewebsites.net/api/usuarios/login';
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xx = JSON.parse(this.responseText) as LoginResult;
            dispatch(login(xx));
            setredirect(true);
            
        }
        else if(this.readyState == 4 && this.status == 400)
        {
            setmessage("Correo o contraseña incorrectos!")

        }

        

    }

    var username = (document.getElementById("username") as HTMLInputElement).value;
    var pass = (document.getElementById("password") as HTMLInputElement).value;

    var data = {username:username,password: pass};
    // Sending our request 
    xhr.send(JSON.stringify(data));

    }
    return(<>
    <div className="loginroot">
        {redirect&& <Navigate to="/" />}
    <div className="fatherx">
    <h3 className="legend">Login</h3>
    <div className="inputxx">
		<span className="fa fa-user" aria-hidden="true" ></span>
		<input className="imputy" type="text" placeholder="Usuario" id="username" />
	</div>
    <div className="inputxx">
		<span className="fa fa-key" aria-hidden="true"></span>
		<input className="imputy" type="password" placeholder="Password" name="password" id="password" style={{backgroundColor: "#eee !important"}}/>
	</div>
    <button type="submit" className="btnlogin" onClick={loginx}>Login</button>
    <p className="loginmessage">{message}</p>
    </div>
    </div>
    </>)
}