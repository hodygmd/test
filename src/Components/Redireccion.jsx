import {useLocation} from "react-router-dom";

const Redireccion = () => {
    const location = useLocation()
    const recibido=location.state.datos
    return (
        <>
            Seleccionaste el id {recibido}
        </>
    )
}
export default Redireccion