import React, {useState, useEffect} from 'react'
import logoBlue from '../../assets/img/logo-home-cloud-blue.svg'
//Api backend
import api from '../../services/api' 
//MaterialUI
import CloseIcon from '@material-ui/icons/Close';
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
//STYLES
import {NavCloud, Content, LiFile, Preview} from './style/mycloud'
//NavUser
import User from './User/User'
//Button Options Add
import OptionsAddFile from './OptionsAddFile/OptionsAddFile'
//Button File Options
import FileOptions from './FileOptions/FileOptions'

export default function MyCloud(){
    const [files, setFiles] = useState([]); 

    const currentURL = window.location.search
    const params = new URLSearchParams(currentURL); 
    const dirURL = params.get('dir');

    const updateFiles = () =>{
        api.get('/listfiles?dir='+dirURL).then(res => {
            setFiles(res.data)
        })
    }
    
    useEffect(() => {
        //Redirect
        api.get('/verifyInstall').then(res => {
            if(!res.data.installed){
                window.location.href = "/";
            }
        })

        //Updated List
        updateFiles()
        setInterval(() => {
            updateFiles()
        }, 2500)
    },[])

    //open next directory
    function callDir(dir){
        window.location.href = currentURL + dir
    }

    //preview functions
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handlePreviewOpen = () => {
        setOpen(true);
    };
  
    const handlePreviewClose = () => {
      setOpen(false);
    };

    const [ext, setExt] = useState("")
    const [preview, setPreview] = useState("")

    const passToURLPreview = (name, extension, miniature = true) => {
        return `http://${ window.location.hostname }:8080/preview?miniature=${ miniature }&show=${ dirURL }/${ name }.${ extension }`
    }

    const arrayImage = ['jpg', 'jpeg', 'png', 'svg']
    const arrayAudio = ['mp3', 'm4a', 'wav', 'aac']
    const arrayVideo = ['mp4']

    function filePreview(ext){
        if(arrayImage.indexOf(ext) === 0){
            return <img 
                        src={preview} 
                        alt="Erro na imagem" 
                        className="preview-image" 
                        style={{
                            width: "100%", 
                            borderRadius: "8px",
                            background: "f1f1f1"}}
                    />
        }else if(arrayAudio.indexOf(ext) === 0){
            return <div className="content-audio">
                        <audio controls src={preview} />
                    </div>
        }else if(arrayVideo.indexOf(ext) === 0){
            return <div className="content-video">
                        <video controls>
                            <source src={preview} />
                        </video>
                    </div>
        }
    }

    return(
        <>
            <Container>
                <NavCloud>
                    <Container style={{position: "relative"}}>
                        <img src={logoBlue} alt="HOME CLOUD" />
                        <User/>
                    </Container>
                </NavCloud>
                <Content>
                    
                    <OptionsAddFile files={files} dirURL={dirURL} />

                    <Grid container spacing={2}>
                        {
                            files.map((file, id) => (
                                <>
                                    <Grid item xs={4} sm={2} key={id}>
                                        <LiFile>
                                            {
                                                file.type ? ( //file
                                                    <>                                                           
                                                        <div className="isolation">
                                                            <FileOptions className="file-options" file={`${file.name}`} typeFile={`folder`}/>
                                                            <button onClick={() => callDir("/"+file.name)} title={file.name}> 
                                                                <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                            </button>
                                                            <p>{file.name}</p>
                                                        </div>
                                                    </>
                                                ) : ( //image
                                                    <>
                                                        <div className="isolation">
                                                            <FileOptions className="options-menu" typeFile="" file={`${file.name}.${file.extension}`} />
                                                            <button title={file.name} variant="outlined" color="primary" onClick={() => {setPreview( passToURLPreview(file.name, file.extension, false) ); setExt(file.extension); handlePreviewOpen()}}> 
                                                                {
                                                                    arrayImage.indexOf(file.extension.toLowerCase()) === 0
                                                                    ?   <img className='img-ext img-miniature' src={ passToURLPreview(file.name, file.extension, true) } alt="Imagem não encontrada"/>
                                                                    :   <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                                }                                                                              
                                                            </button>                                                           
                                                            <p>{file.name}</p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </LiFile>
                                    </Grid>
                                </>
                            )) 
                        }
                    </Grid>
                    {/*Modal Preview*/}
                    <div>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handlePreviewClose}
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
                                    onClick={handlePreviewClose} 
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
                                        { filePreview(ext) }
                                    </Preview>
                                </DialogContent>
                            <DialogActions>
                            
                            {/*<Button onClick={handlePreviewClose} color="primary" autoFocus>
                                Baixar
                            </Button>*/}
                            </DialogActions>
                        </Dialog>
                    </div>
                </Content>
            </Container>
        </>
    )
}