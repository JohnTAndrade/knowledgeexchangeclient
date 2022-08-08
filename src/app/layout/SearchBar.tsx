import { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Pregunta } from '../models/Pregunta';
import './SearchBar.css';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { increment } from "../store/productSlice";

export default function SearchBar() {

 const dispatch = useDispatch();


    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

function setPreguntasx(value: any){
    let x = value;
}

function search(e: any)
{
 e.preventDefault();
 var value = (document.getElementById("searchtext") as HTMLInputElement).value;
 dispatch(increment(value));

    
    //fetch('https://localhost:44318/api/Preguntas/getbyfilter?value='+value).then(response => response.json()).then(data => setPreguntasx(data))

}

    return (
        <>
            <div className="search-container">
                <form action="/contact">
                    <input type="text" id="searchtext" placeholder="Search.." name="searchx" className='xxxx'/>

                    
                        <button type="submit" id="searchId" onClick={search}><i className="fa fa-search"></i></button>
                        
                       
                </form>
            </div>
        </>
    )
}