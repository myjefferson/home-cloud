import React from 'react'

import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Preview} from '../pages/MyCloud/style/mycloud'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import mimeTypes from '../config/mimeTypes'

export default function DialogPreview(props) {
    //preview states
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    
    function filePreview(extension){
        if(mimeTypes.image.indexOf(extension) > -1 ){
            return <img 
                        src={props.dataPreview.preview} 
                        alt="Erro na imagem" 
                        className="content-image" 
                        style={{
                            width: "100%", 
                            borderRadius: "8px",
                            background: "f1f1f1"}}
                    />
        }
        
        if(mimeTypes.audio.indexOf(extension) > -1){
            return <div className="content-audio">
                        <audio controls src={props.dataPreview.preview} />
                    </div>
        }
        
        if(mimeTypes.video.indexOf(extension) > -1){
            return <div className="content-video">
                        <video controls>
                            <source src={props.dataPreview.preview} />
                        </video>
                    </div>
        }

        if(mimeTypes.document.indexOf(extension) > -1){
            return <embed className="content-document" src={props.dataPreview.preview} type={`application/${extension}`}/>
        }

        if(extension === 'gif' || mimeTypes.image.indexOf(extension) < 0){
            return <div><p> Formato ainda não suportado para vizualisação. </p></div>
        }
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={props.open}
                onClose={props.handlePreviewClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle 
                    id="responsive-dialog-title"
                    style={{
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {"Visualização do arquivo"} 
                    <Button 
                        onClick={props.handlePreviewClose} 
                        color="primary"
                        style={{
                            position: "absolute",
                            right: 15
                        }}
                    >
                        Fechar <CloseIcon/>
                    </Button>
                </DialogTitle>
                    <DialogContent
                        style={{
                            position: "relative",
                            minWidth: "350px",
                            margin: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >  
                        <Preview>
                            <div>
                            <p>Nome do arquivo</p>
                            <h3>{props.dataPreview.name.split('-').shift()}</h3>
                            { filePreview(props.dataPreview.extension.toLowerCase()) }
                            </div>
                        </Preview>
                    </DialogContent>
                <DialogActions>
                
                {/*<Button onClick={handlePreviewClose} color="primary" autoFocus>
                    Baixar
                </Button>*/}
                </DialogActions>
            </Dialog>
        </>
    );
}