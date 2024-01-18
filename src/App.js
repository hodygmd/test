import logo from './logo.svg';
import './App.css'
import ComponentePrueba from "./Components/ComponentePrueba";
import GitTest from "./Components/GitTest";
import Renderizacion from "./Components/Renderizacion";
import Filtro from "./Components/Filtro";
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import Redireccion from "./Components/Redireccion";

function App() {
    return (
        <div>
            <Router>
                <nav className={'bg-sky-500 mb-5'}>
                    <div className={'d-flex justify-around'}>
                        <navitem>
                            <Link to="/"
                                  className={"text-decoration-none text-dark fw-semibold"}>ComponentePrueba</Link>
                        </navitem>
                        <navitem>
                            <Link to="/render"
                                  className={"text-decoration-none text-dark fw-semibold"}>Renderizacion</Link>
                        </navitem>
                        <navitem>
                            <Link to="/test" className={"text-decoration-none text-dark fw-semibold"}>GitTest</Link>
                        </navitem>
                        <navitem>
                            <Link to="/filtro" className={"text-decoration-none text-dark fw-semibold"}>Filtro</Link>
                        </navitem>
                    </div>
                </nav>
                <Routes>
                    <Route path='/' element={<ComponentePrueba/>}/>
                    <Route path='/render' element={<Renderizacion/>}/>
                    <Route path='/test' element={<GitTest/>}/>
                    <Route path='/filtro' element={<Filtro/>}/>
                    <Route path={"/filtro/red"} element={<Redireccion/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
