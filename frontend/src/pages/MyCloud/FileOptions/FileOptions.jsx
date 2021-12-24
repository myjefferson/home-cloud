import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import FileDownload from 'js-file-download'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Server-Side API
import api from '../../../services/api'

//ICONS
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';

export default function OptionsMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //URL DIR
  const currentURL = window.location.search
  const params = new URLSearchParams(currentURL); 
  const dirURL = params.get('dir');

  //DOWNLOAD FUNCTION
  async function Download(file){
    await api.get(`/download?dir=${dirURL}/${file}&filename=${file}`, {
            responseType: 'blob',             
        }
    ).then((res) => {
        FileDownload(res.data, file);
    })
  }

  //DELETE FILE
  async function Delete(file){
    await api.delete(`/delete?dir=${dirURL}/${file}`).then((res) => {
      console.log(res)
    })
  }

  //preview functions
  const [openDelete, setOpenDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [deleteConfirm, setDeleteConfirm] = useState("")

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
          <MenuItem  onClick={() => {handleOpenDelete(); handleClose()}}>
            <DeleteIcon style={{marginRight: 10}}/> Remover
          </MenuItem> 
        ) : (
          <>
            <MenuItem onClick={() => {Download(props.file); handleClose()}}>
              <CloudDownloadIcon style={{marginRight: 10}}/> Baixar
            </MenuItem>
            <MenuItem  onClick={() => {handleOpenDelete(); handleClose()}}>
              <DeleteIcon style={{marginRight: 10}}/> Remover
            </MenuItem>
          </>
        )
        /*
          <MenuItem  onClick={handleClose}>
            Detalhes do Arquivo
          </MenuItem>
        */
      }

      </Menu>

      {/*Modal Confirmation*/}
      <Dialog
          fullScreen={fullScreen}
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="responsive-dialog-title"
      >
          <DialogTitle id="responsive-dialog-title">{"Tem certeza que deseja excluir?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      {"Você vai apagar o arquivo permanentemente!"}
                  </DialogContentText>
              </DialogContent>
          <DialogActions>
          <Button onClick={() => {Delete(props.file); handleCloseDelete()}} variant="text">
              Confirmar
          </Button>
          <Button 
              onClick={handleCloseDelete} 
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