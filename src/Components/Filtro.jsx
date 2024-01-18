import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './style.css'
import SelectFiltro from "./SelectFiltro";

/*const ExpandableSelect = ({datos,filtroFecha}) => {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };
    const [reiniciarFiltro, setReiniciarFiltro] = useState(null);
    const datosFiltrados = datos.filter((dato) => {
        // Si no hay filtro de fecha, mostrar todos los datos
        if (!filtroFecha) {
            return true;
        }

        // Filtrar por la propiedad de fecha
        return dato.fecha.includes(filtroFecha);
    });
    const handleSelect = (event) => {
        setReiniciarFiltro(event.target.value)
        navigate('red', {state: {datos: event.target.value}})
    }
    return (
        <select className={`ml-5 z-3 position-absolute`} onChange={handleSelect} value={reiniciarFiltro}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                size={isExpanded ? datosFiltrados.length+1 : 1}>
            <option value={null} selected>Seleccione</option>
            {datosFiltrados.map((dato) => (
                <option value={dato.nombre}>{dato.nombre} - {dato.fecha}</option>
            ))}
        </select>
    )
        ;
};*/
const Filtro = () => {
    const [flag,setFlag]=useState(false)
    const [filtroFecha, setFiltroFecha] = useState(null);
    const [datos, setDatos] = useState([])
    useEffect(() => {
        /*axios.post(`http://localhost:3001/selectf`,{fecha:filtroFecha}).then(response => {
            const datas = response.data[0];
            setDatos(datas);
            console.log(datas[0])
        }).catch(error => {
            console.log(error)
        })*/
        llamar(null)
        setFlag(false)
    }, [flag]);
    const llamar=(fecha)=>{
        axios.post(`http://localhost:3001/selectf`,{fecha}).then(response => {
            const datas = response.data[0];
            setDatos(datas);
            console.log(datas[0])
        }).catch(error => {
            console.log(error)
        })
    }



    const handleFechaChange = (e) => {
        const nuevaFecha = e.target.value;
        setFiltroFecha(nuevaFecha);
        /*axios.post(`http://localhost:3001/selectf`,{fecha:nuevaFecha}).then(response => {
            const datas = response.data[0];
            setDatos(datas);
            console.log(nuevaFecha)
            console.log(datas[0])
        }).catch(error => {
            console.log(error)
        })*/
        llamar(nuevaFecha)
    };

    // Filtrar datos en tiempo real según la fecha
    const borrar = () => {
        setFiltroFecha('')
        llamar(null)
    }

    return (
        <>
            <div>
                <input type="date" value={filtroFecha} onChange={handleFechaChange}/>
                <button onClick={borrar}><i className="bi bi-x-lg bg-danger"></i></button>
                <SelectFiltro datos={datos} filtroFecha={filtroFecha}/>
                {/*<ul>
                    {datosFiltrados.map((dato) => (
                        <li key={dato.id}>{dato.nombre} - {dato.fecha}</li>
                    ))}
                </ul>*/}
            </div>
        </>
    )
}
export default Filtro