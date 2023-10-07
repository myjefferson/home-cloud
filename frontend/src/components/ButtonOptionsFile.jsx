import {useState, useRef, Fragment} from 'react';

//components
import Dropdown from './Dropdown/Dropdown';

//Server-Side API
import api from '../services/api'
import startDownload from 'js-file-download'
import Modal from './Modal/Modal';

//ICONS
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';


const ButtonOptionsFile = (props) => {
    const [openModal, setOpenModal] = useState(false);

    //url get dir
    const currentURL = window.location.search
    const params = new URLSearchParams(currentURL); 
    const dirURL = params.get('dir');

    const handleDownloadFile = async (file) => {
        await api.get(`/download?dirpage=${dirURL}/${file}&filename=${file}`, {
            responseType: 'blob',             
        }).then((res) => { startDownload(res.data, file); })
    }

    const handleDeleteFile = async (file) => {
        setOpenModal(false)
        const dirCript = btoa(`${dirURL}/${file}`)
        await api.delete(`/delete?dirpage=${dirCript}`)
        .then((res) => { console.log(res) })
    }

    return (
        <>
            {
                props.typeFile === "folder" ? (  
                    <Dropdown
                        options={[
                            {
                                titleButton: 'Remover', 
                                actionButton: () => {setOpenModal(true);}
                            },           
                        ]}
                        element={<EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />}
                    />
                ) : (
                    <Dropdown
                        options={[
                            {
                                titleButton: 'Baixar', 
                                actionButton: () => {handleDownloadFile(props.file);}
                            },     
                            {
                                titleButton: 'Remover', 
                                actionButton: () => {setOpenModal(true);}
                            }      
                        ]}
                        element={<EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />}
                    />
                )
            }
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                title={"Remoção"}
                body={"Têm certeza que você deseja remover?"}
                buttons={[
                    {
                        titleButton: "Sim, Remover", 
                        actionButton: () => { handleDeleteFile(props.file); setOpenModal(false)},
                        bgColor: 'bg-red-600 hover:bg-red-500'
                    }
                ]}
            />
        </>
    );
}

export default ButtonOptionsFile;