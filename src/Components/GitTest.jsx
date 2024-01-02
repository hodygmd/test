import React, {useEffect, useState} from "react";
import axios from "axios";

const GitTest = () => {
    const [data, setData] = useState([]);
    const [flag,setFlag] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:3001/api/images/get`).then(response => {
            const datas = response.data;
            setData(datas);
        }).catch(error => {
            console.log(error)
        })
        setFlag(false)
    }, [flag]);
    const [imagen, setImagen] = useState(null);

    const seleccionarImagen = (e) => {
        setImagen(e.target.files[0]);
    };

    const enviarImagen = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imagen);
        axios.post('http://localhost:3001/api/images',formData).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        setFlag(true)
    };
    const deleteImg=(id)=>{
        axios.delete(`http://localhost:3001/api/images/${id}`).then(response => {
            console.log(response)
            setFlag(true)
        }).catch(error => {
          console.log(error)
        })
    }
    return (
        <div>
            <h1>Git Test</h1>
            <form onSubmit={enviarImagen}>
                <input type="file" name="image" accept="image/*" onChange={seleccionarImagen}/><br/>
                <button type="submit" className={'bg-sky-500'}>Enviar</button><br/>
            </form>
            <br/><br/>
            <div className={'d-flex flex-row justify-around flex-wrap'}>
                {data.map((item,index)=>(
                    <div>
                        <label>Extraida de la bd</label>
                        <img src={`http://localhost:3001/${item.image}`} style={{width: '150px', height: '150px'}}/>
                        <button type="button" className={'bg-red-500'} onClick={()=>deleteImg(item.id)}>Eliminar</button>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
export default GitTest;