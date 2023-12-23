import React, {useEffect, useState} from 'react'
import axios from "axios";

const ComponentePrueba = () => {
    const url = 'http://localhost:3001'
    const [data, setData] = useState([])
    const [columnas, setColumnas] = useState([])
    const [cont, setCont] = useState(0)
    const [sel,setSel]=useState(0)
    const handleSelect=(event)=>{
        setSel(event.target.value)
        axios.get(`${url}/get/${event.target.value}`).then(response => {
            const datas = response.data;
            const datosFiltrados = datas.filter(item => Array.isArray(item));
            setData(datosFiltrados)
            const keys = []
            for (let i = 0; i < datosFiltrados.length; i++) {
                keys.push(Object.keys(datosFiltrados[i][0]))
            }
            setColumnas(keys)
            setCont(datosFiltrados.length)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {

    }, []);

    const editElement=(id,ver)=>{
        console.log(`carac ${id},ver ${ver}`)
    }
    const mostrarTabla = () => {
        const tablas = [];
        for (let i = 0; i < cont; i++) {
            tablas.push(
                <div className={'flex justify-center my-5'} key={i}>
                    <table className={'border-collapse border border-slate-500'}>
                        <thead>
                        <tr>
                            {columnas[i] &&
                                columnas[i].map((columna, index) => (
                                    <th key={index} className={'border border-slate-600 p-3'}>
                                        {columna}
                                    </th>
                                ))}
                            <th className={'border border-slate-600 p-3'}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data[i] &&
                            data[i].map((fila, index) => (
                                <tr key={index}>
                                    {columnas[i] &&
                                        columnas[i].map((columna, index) => (
                                            <td key={index} className={'border border-slate-700 text-center'}>
                                                {fila[columna]}
                                            </td>
                                        ))}
                                    <td className={'border border-slate-600 p-3'}>
                                        <button className={'bg-sky-500 p-1 rounded-md'} onClick={()=>editElement(fila.id_carac,i+1)}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        return tablas;
    }
    return (
        <>
            {data[5] &&
                <div className={'flex justify-center'}>
                    <table className={'border-collapse border border-slate-500'}>
                        <thead>
                        <tr>
                            {columnas[0] && columnas[0].map((columna, index) => (
                                <th key={index} className={'border border-slate-600 p-3'}>{columna}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data[0] && data[0].map((fila, index) => (
                            <tr key={index}>{columnas[0] && columnas[0].map((columna, index) => (
                                <td key={index} className={'border border-slate-700 text-center'}>{fila[columna]}</td>
                            ))}</tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
            <div className={'flex justify-center'}>
                <label>id_ver</label>
                <select onChange={handleSelect}>
                    <option disabled selected>--Seleccionar--</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </select>
            </div>
            {mostrarTabla()}
        </>
    )
}
export default ComponentePrueba