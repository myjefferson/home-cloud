import React, { useRef, useState} from 'react';
import FormData from 'form-data'
import api from '../services/api'
import Dropdown from './Dropdown/Dropdown';
import Modal from './Modal/Modal';
import { PlusIcon, FolderPlusIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

//ICONS

export default function ButtonAddFiles(files, setFiles) {   
  const [openModal, setOpenModal] = useState(false);
  //Current URL
  const currentURL = window.location.search
  const params = new URLSearchParams(currentURL); 
  const dirURL = params.get('dir');
  
  //Upload File--
  const fileElement = useRef(null)
  const onInputUpload = () =>{
    fileElement.current.click();
  }

  const sendFile = async() =>{
      const dataForm = new FormData();
      for(const file of fileElement.current.files){
        dataForm.append('files', file)
      }

      await api.post('upload?dirpage=' + dirURL, dataForm, {
          headers: {
              "Content-Type": `mutipart/form-data; boundary=${dataForm._boundary}`
          }
      }).then(res => {
          console.log(res.data)
      }).catch(error =>{
          console.log('Erro' + error)
      })
  }

  //Make a folder--
  const [nameFolder, setNameFolder] = useState('')
  const makeFolder = async() =>{
    if(nameFolder !== ""){
      await api.post('createFolder?dirpage='+dirURL+"&name="+nameFolder).then(res => {
        console.log("pasta criada")
      }).catch(error => {
        console.log("Falha ao criar a pasta")
      })
    }else{
      console.log("O campo está vazio")
    }
  }

  //Window Dialog
  return (
    <div className='dropdown-upload'>
      {/* Input upload File */}
      <input 
        type="file" 
        id="files" 
        ref={fileElement}
        onChange={sendFile} 
        multiple
        style={{
          display: "none",
        }}
      />

      {/*Button Add File*/}
      <Dropdown
        options={[
          {
            titleButton: <div className="flex"><FolderPlusIcon className='h-6 w-6 text-gray-600 mr-2' aria-hidden="true"/> Criar Pasta</div>, 
            actionButton: () => {setOpenModal(true)}
          },
          {
            titleButton: <div className='flex'><DocumentPlusIcon className='h-6 w-6 text-gray-600 mr-2' aria-hidden="true"/> Upload de Arquivo</div>,
            actionButton: () => { onInputUpload() }
          }       
        ]}
        element={
          <PlusIcon className="-mr-1 h-12 w-12 p-2 text-gray-100 bg-blue-500 hover:bg-blue-600 rounded-full" aria-hidden="true"/>
        }
      />

      {/*Open Modal Create Folder*/}
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title={"Criar Pasta"}
        body={"Nome da pasta"}
        fields={[
          {
            type: "text",
            autoFocus: true,
            name: "name",
            onChange: event => setNameFolder(event.target.value)
          }
        ]}
        buttons={[
          {
              titleButton: "Criar Pasta", 
              actionButton: () => { makeFolder(); setOpenModal(false) },
              bgColor: 'bg-blue-600 hover:bg-blue-500'
          }
        ]}
      />
    </div>
  );
}