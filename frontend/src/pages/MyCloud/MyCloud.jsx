import { useState, useEffect, useRef } from 'react'
import uuid from 'react-uuid'; //temporary uuid
import logoBlue from '../../assets/img/logo-home-cloud-blue.svg'
//Api backend
import api from '../../services/api' 

//STYLES
import {NavCloud, Content, LiFile} from './style/mycloud'
//NavUser
import User from './User/User'
//Button Options Add
import ButtonAddFiles from '../../components/ButtonAddFiles'
//Button File Options
import ButtonOptionsFile from '../../components/ButtonOptionsFile'
// import CircularIndeterminate from '../../components/CircularIndeterminate';
import DialogPreview from '../../components/DialogPreview';

const MyCloud = () => {
    const arrayExtensionsVideo = ['mp4', 'avi']
    const arrayExtensionsAudio = ['mp3', 'm4a']
    const arrayExtensionsImage = ['jpg', 'jpeg', 'png', 'svg']

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
    
    const getFiles = () => {
        api.get('/listfiles?dir='+dirURL).then(res => {
            setFiles(res.data)
            setLoading('none');
        })
    }
    
    useEffect(() => {
        if(!localStorage.getItem('clientId')){
            localStorage.setItem('clientId', uuid())
        }
        //Redirect
        // api.get('/verifyInstall').then(res => {
        //     if(!res.data.installed){
        //         window.location.href = "/";
        //     }
        // })

        api.get('/allUsers').then(res => {
            setFiles(res.data)
            // setLoading('none');
        })

        //Updated List
        getFiles()
        setInterval(() => {
            getFiles()
        }, 2500)
    }, [])

    //open next directory
    function callDir(dir){
        window.location.href = currentURL + dir
    }


    const mediaPreview = (name, extension, miniature = true) => {
        const clientId = localStorage.getItem('clientId')
        const dirCript = btoa(`${ dirURL }/${ name }.${ extension }`);
        return `http://${ process.env.REACT_APP_HOSTNAME }:8080/preview?miniature=${ miniature }&show=${dirCript}&clientId=${clientId}`
    }

    return(
        <>
            <div className='container mx-auto'>

                <NavCloud>
                    <div className='container' style={{position: "relative"}}>
                        <img src={logoBlue} alt="HOME CLOUD" />
                        <User/>
                    </div>
                </NavCloud>

                <Content>
                    <ButtonAddFiles files={files} dirURL={dirURL} />
                    {/* <CircularIndeterminate display={loading}/> */}

                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4'>
                        {
                            files.map((file, id) => (
                                <>
                                    <LiFile key={id}>
                                        {
                                            file.type ? ( //isFolder
                                                <>                                                           
                                                    <div className="isolation">
                                                        <ButtonOptionsFile className="file-options" index={id} file={`${file.name}`} typeFile={`folder`}/>
                                                        <button onClick={() => callDir("/"+file.name)} title={file.name}> 
                                                            <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                        </button>
                                                        <p>{file.name}</p>
                                                    </div>
                                                </>
                                            ) : ( //isFile (Image, Video, Audio...)
                                                <>
                                                    <div className="isolation">
                                                        <ButtonOptionsFile className="options-menu" typeFile="" index={id} file={`${file.name}.${file.extension}`} />
                                                        <button title={file.name} variant="outlined" color="primary" onClick={() => {
                                                            dataPreview['extension'] = file.extension
                                                            dataPreview['name'] = file.name
                                                            dataPreview['preview'] = mediaPreview(file.name, file.extension, false); 
                                                            setOpenPreview(true)
                                                        }}> 
                                                            {
                                                                arrayExtensionsImage.indexOf(file.extension.toLowerCase()) > -1
                                                                ?   <img className='img-ext img-miniature' src={ mediaPreview(file.name, file.extension) } alt="Imagem não encontrada"/>
                                                                :   <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                            }                                                                              
                                                        </button>                                                           
                                                        <p>{file.name}</p>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </LiFile>
                                </>
                            )) 
                        }
                    </div>
                    {/*Modal Preview*/}
                    <div>
                        
                        <DialogPreview 
                            dataPreview={dataPreview}
                            handlePreviewClose={() => setOpenPreview(false)}
                            open={openPreview}
                            setOpen={setOpenPreview}
                            title={"Criar Pasta"}
                            body={"Nome da pasta"}
                        />

                    </div>
                </Content>
            </div>
        </>
    )
}

export default MyCloud