import React, {useEffect, useState} from 'react'
import axios from "axios";

const ComponentePrueba = () => {
    const url = 'http://localhost:3001'
    const [data, setData] = useState([])
    const [columnas, setColumnas] = useState([])
    const [cont, setCont] = useState(0)
    useEffect(() => {
        axios.get(`${url}/get/1`).then(response => {
            /*console.log(response.data)*/
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
    }, []);
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
            {data[2] &&
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
            {mostrarTabla()}


        </>
    )
}
export default ComponentePrueba