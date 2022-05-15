import React, { useRef, useState} from 'react';
import FormData from 'form-data'
import api from '../../../services/api'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//ICONS
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder'

export default function OptionAdd(files, setFiles) {   
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

      await api.post('upload/' + dirURL, dataForm, {
          headers: {
              "Content-Type": `mutipart/form-data; boundary=${dataForm._boundary}`
          }
      }).then(res => {
          console.log(res.data)
          handleClose();
      }).catch(error =>{
          console.log('Erro' + error)
      })
  }

  //Make a folder--
  const [nameFolder, setNameFolder] = useState('')
  const makeFolder = async() =>{
    if(nameFolder !== ""){
      //useEffect(() => {
        await api.post('createFolder?dirpage='+dirURL+"&name="+nameFolder).then(res => {
          console.log("pasta criada")
        }).catch(error => {
          console.log("Falha ao criar a pasta")
        })
    }else{
      console.log("O campo está vazio")
    }
  }

  //Handle Actions
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Window Dialog
  const [openDialog, setOpen] = useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
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

      {/*Button Plus*/}
      <Fab 
        color="primary" 
        aria-label="add"
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: "23px",
          right: "23px",
          borderRadius: 100,
          background: "#1070FF"
        }} 
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      
      {/*Open Menu Options Upload*/}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {handleClose(); handleClickOpenDialog()}}><CreateNewFolder style={{marginRight: 10}}/> Criar Pasta</MenuItem>
        <MenuItem onClick={() => {handleClose(); onInputUpload()}}>
          <CloudUploadIcon style={{marginRight: 10}} /> Upload na Home
        </MenuItem>
      </Menu>

      {/*Open Dialog Set Name Folder*/}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle><CreateNewFolder style={{fontSize: 26, marginBottom: "-5px"}}/> Criar Pasta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o nome da pasta que deseja criar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome da Pasta"
            type="text"
            fullWidth
            variant="standard"
            onChange={event => setNameFolder(event.target.value) /*The target for useState is value*/}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={() => {makeFolder(); handleCloseDialog()}}>Criar Pasta</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}