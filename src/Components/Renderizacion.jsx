import {React, useState, useEffect, useRef} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Renderizacion = () => {
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/getUser`).then(response => {
            const datas = response.data;
            setData(datas);
            console.log(datas)
        }).catch(error => {
            console.log(error)
        })
        setFlag(false)
    }, [flag]);
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [edit, setEdi] = useState(false)
    const [idToEdit, setIdToEdit] = useState(0)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleName = (event) => {
        setName(event.target.value)
    }
    const handlePass = (event) => {
        setPass(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!edit) {
            axios.post(`http://localhost:3001/postUser`, {user: name, pass: pass}).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        } else {
            axios.post(`http://localhost:3001/putUser/${idToEdit}`, {id:idToEdit,user: name, pass: pass}).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
            setEdi(false)
        }

        setFlag(true)
    }
    const editElement = (id, index) => {
        setIdToEdit(id)
        setName(data[index].name)
        setPass(data[index].pass)
        setEdi(true)
        toggle()
    }
    const pdfRef = useRef();

    const handleGeneratePDF = () => {
        const input = pdfRef.current;

        if (input) {
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    pdf.save("test.pdf");
                });
        }
    };

    return (
        <>
            <button onClick={handleGeneratePDF}>Generar PDF</button>
            <div ref={pdfRef}>
                <Button color="danger" onClick={toggle}>
                    Click Me
                </Button>
                <h1>dfsgggfdgf</h1>
            </div>
            <br/>
            <div>
                <table className={'border-collapse border border-slate-500'}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Pass</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr className={"align-middle"}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.pass}</td>
                            <td>
                                <button onClick={() => editElement(item.id, index)}>editar</button>
                            </td>
                        </tr>


                    ))
                    }
                    </tbody>
                </table>
            </div>

            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <label>name</label><br/>
                            <input value={name} onChange={handleName}/><br/>
                            <label>pass</label><br/>
                            <input value={pass} onChange={handlePass}/><br/>
                        </ModalBody>
                        <ModalFooter>
                            <Button type={'submit'} color="primary" onClick={toggle}>
                                Do Something
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        </>
    )
}
export default Renderizacion