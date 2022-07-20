import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import startDownload from 'js-file-download'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Server-Side API
import api from '../services/api'

//ICONS
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
//import InfoIcon from '@material-ui/icons/Info';
//import EditIcon from '@material-ui/icons/Edit';

export default function ButtonOptionsFile(props) {
  //useStates
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const open = Boolean(anchorEl);

  //Handle onClick Buttons
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };

  //URL DIR
  const currentURL = window.location.search
  const params = new URLSearchParams(currentURL); 
  const dirURL = params.get('dir');

  async function downloadFile(file){
    await api.get(`/download?dirpage=${dirURL}/${file}&filename=${file}`, {
            responseType: 'blob',             
    }).then((res) => {
        startDownload(res.data, file);
    })
  }

  async function deleteFile(file){
    setOpenDialogDelete(false)
    await api.delete(`/delete?dirpage=${dirURL}/${file}`)
    .then((res) => {
      console.log(res)
    })
  }

  //preview functions
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          position: "absolute",
          top: -4,
          right: -4,
          background: "#FFF",
          border: "none",
          width: "30px",
          height: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,.3)",
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {/*<MenuItem  onClick={handleClose}>
          <CreateIcon style={{marginRight: 10}}/>Renomear
        </MenuItem>*/}
        {
          props.typeFile === "folder" ? (
            <MenuItem  onClick={() => {setOpenDialogDelete(true); handleClose()}}>
              <DeleteIcon style={{marginRight: 10}}/> Remover
            </MenuItem> 
          ) : (
            <>
              <MenuItem onClick={() => {downloadFile(props.file); handleClose()}}>
                <CloudDownloadIcon style={{marginRight: 10}}/> Baixar
              </MenuItem>
              <MenuItem  onClick={() => {setOpenDialogDelete(true); handleClose()}}>
                <DeleteIcon style={{marginRight: 10}}/> Remover
              </MenuItem>
            </>
          )
        }

        {/* <MenuItem  onClick={handleClose}>
          <InfoIcon style={{marginRight: 10}}/> Detalhes
        </MenuItem>
        <MenuItem  onClick={handleClose}>
          <EditIcon style={{marginRight: 10}}/> Renomear
        </MenuItem> */}

      </Menu>

      <Dialog
          fullScreen={fullScreen}
          open={openDialogDelete}
          onClose={() => setOpenDialogDelete(false)}
          aria-labelledby="responsive-dialog-title"
      >
          <DialogTitle id="responsive-dialog-title">{"Tem certeza que deseja excluir?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      {"Você vai apagar o arquivo permanentemente!"}
                  </DialogContentText>
              </DialogContent>
          <DialogActions>
          <Button onClick={() => deleteFile(props.file)} variant="text">
              Confirmar
          </Button>
          <Button 
              onClick={() => setOpenDialogDelete(false)} 
              color="primary"
              autofocus
              variant="contained"
              style={{
                background: "#1070ff"
              }}
          >
              Cancelar
          </Button>
          
          </DialogActions>
      </Dialog>
    </>
  );
}