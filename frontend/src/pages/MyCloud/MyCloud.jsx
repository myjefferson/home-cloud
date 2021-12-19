import React, {useState, useEffect} from 'react'
import logoBlue from '../../assets/img/logo-home-cloud-blue.svg'

import api from '../../services/api' 
//MaterialUI
import {Container} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

//STYLES
import {NavCloud, Content, LiFile} from './style/mycloud'

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
        api.get('files?dir='+dirURL).then(res => {
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
        }, 1600)
    },[])

    //open next directory
    function callDir(dir){
        window.location.href = currentURL + dir
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
                    
                    <OptionsAddFile files={files}/>

                    <Grid container spacing={2}>
                        {
                            files.map((file, id) => (
                                <>
                                    <Grid item xs={4} sm={2}>
                                        <LiFile key={id}>
                                            {
                                                file.type ? (
                                                    <>                                                           
                                                        <div className="isolation">
                                                            <FileOptions className="file-options" file={`${file.name}`} />
                                                            <button onClick={() => callDir("/"+file.name)} title={file.name}> 
                                                                <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
                                                            </button>
                                                            <p>{file.name}</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="isolation">
                                                            <FileOptions className="options-menu" file={`${file.name}.${file.extension}`} />
                                                            <button title={file.name}> 
                                                                    <img className="img-ext" src={`./img/extensions/${file.extension}.png`} alt=""/>
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
                </Content>
            </Container>
        </>
    )
}