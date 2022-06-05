import React, {useState, useEffect} from 'react'
import logoBlue from '../../assets/img/logo-home-cloud-blue.svg'
//Api backend
import api from '../../services/api' 
//MaterialUI
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

//STYLES
import {NavCloud, Content, LiFile, Preview} from './style/mycloud'
//NavUser
import User from './User/User'
//Button Options Add
import ButtonAddFiles from '../../components/ButtonAddFiles'
//Button File Options
import ButtonOptionsFile from '../../components/ButtonOptionsFile'
import CircularIndeterminate from '../../components/CircularIndeterminate';
import DialogPreview from '../../components/DialogPreview';

export default function MyCloud(){
    
    const [files, setFiles] = useState([]); 

    const [openPreview, setOpenPreview] = useState(false);
    const [loading, setLoading] = useState('flex');

    const [dataPreview] = useState({
        name: "",
        extension: "",
        preview: ""
    })

    const currentURL = window.location.search
    const params = new URLSearchParams(currentURL); 
    const dirURL = params.get('dir');
    
    const updateFiles = () => {
        api.get('/listfiles?dir='+dirURL).then(res => {
            setFiles(res.data)
            setLoading('none');
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
    }, [])

    //open next directory
    function callDir(dir){
        window.location.href = currentURL + dir
    }


    const passToURLPreview = (name, extension, miniature = true) => {
        return `http://${ window.location.hostname }:8080/preview?miniature=${ miniature }&show=${ dirURL }/${ name }.${ extension }`
    }

    const arrayImage = ['jpg', 'jpeg', 'png', 'svg']

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
                    <ButtonAddFiles files={files} dirURL={dirURL} />
                    <CircularIndeterminate display={loading}/>

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
                                                            <ButtonOptionsFile className="file-options" file={`${file.name}`} typeFile={`folder`}/>
                                                            <button onClick={() => callDir("/"+file.name)} title={file.name}> 
                                                                <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                            </button>
                                                            <p>{file.name}</p>
                                                        </div>
                                                    </>
                                                ) : ( //image
                                                    <>
                                                        <div className="isolation">
                                                            <ButtonOptionsFile className="options-menu" typeFile="" file={`${file.name}.${file.extension}`} />
                                                            <button title={file.name} variant="outlined" color="primary" onClick={() => {
                                                                dataPreview['extension'] = file.extension
                                                                dataPreview['name'] = file.name
                                                                dataPreview['preview'] = passToURLPreview(file.name, file.extension, false); 
                                                                setOpenPreview(true)
                                                            }}> 
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
                        
                        <DialogPreview 
                            dataPreview={dataPreview}
                            open={openPreview} 
                            handlePreviewClose={() => setOpenPreview(false)}
                        />

                    </div>
                </Content>
            </Container>
        </>
    )
}