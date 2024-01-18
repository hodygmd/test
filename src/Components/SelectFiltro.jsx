import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

const SelectFiltro=({datos,filtroFecha})=>{
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };
    /*const datosFiltrados = datos.filter((dato) => {

        if (!filtroFecha) {
            return true;
        }

        return dato.fecha.includes(filtroFecha);
    });*/
    const handleSelect = (event) => {
        navigate('red', {state: {datos: event.target.value}})
    }
    return(
        <>
            <select className={`ml-5 z-3 position-absolute`} onChange={handleSelect}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    size={isExpanded ? datos.length + 1 : 1}>
                <option value={null} selected>Seleccione</option>
                {datos.map((dato) => (
                    <option value={dato.ID}>{dato.ID} - {dato.FECHA}</option>
                ))}
            </select>
        </>
    )
}
export default SelectFiltro