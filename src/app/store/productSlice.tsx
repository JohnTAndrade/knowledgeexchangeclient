import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from '../models/loginResult';
import { Pregunta } from '../models/Pregunta'

export interface PreguntasState {
  Preguntas: Pregunta[],
  incrementAmount: number,
  user:LoginResult
}

const initialState: PreguntasState = {
    Preguntas: getall(),
  incrementAmount : 1,
  user: { nombre:"", apellido:"", token:"", usuarioName:"",id:0}
}

function getall()
{
    var xx :Pregunta[]=[];

    
    var xhr = new XMLHttpRequest();
  
    // Making our connection  
    var url = 'https://tesisbe.azurewebsites.net/api/Preguntas';
    xhr.open("GET", url, false);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xx = JSON.parse(this.responseText) as Pregunta[];
        }
    }
    // Sending our request 
    xhr.send();

   if (xx === null)
   {
    return [];
   }
     
    return xx;
}



 function  search(param:any):Pregunta[]
{
  var xx :Pregunta[]=[];

    var value = (document.getElementById("searchtext") as HTMLInputElement).value;

    var xhr = new XMLHttpRequest();
  
    // Making our connection  
    var url = 'https://tesisbe.azurewebsites.net/api/Preguntas/getbyfilter?value='+param;
    xhr.open("GET", url, false);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xx = JSON.parse(this.responseText) as Pregunta[];
        }
    }
    // Sending our request 
    xhr.send();

   if (xx === null)
   {
    return [];
   }

     //x.then(valuexx => function(valuexx:any){xx = const json = JSON.stringify(response);valuexx;});
     
     return xx;


}

export {}

export const counterSlice = createSlice({
  name: 'preguntas',
  initialState,
  reducers: {
    increment:  (state, action: PayloadAction<string>) => {
      state.Preguntas =  search(action.payload);
    },
    login:(state, action: PayloadAction<LoginResult>) => {
        state.user = action.payload;
      },
    getAll:(state, action:any) => {
        state.Preguntas = getall();
      }
  },
})

export const { increment, login, getAll } = counterSlice.actions

export default counterSlice.reducer