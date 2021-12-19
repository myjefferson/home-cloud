import React, { useEffect, useState } from 'react'
import {Content, Developer} from './style/installer'
import Dialogs from './Dialogs'
import api from '../../services/api'

export default props =>{
    const [dialog, setDialog] = useState(0)
    var count = 0;

    //Verify Installer
    api.get('/verifyInstall').then(res => {
        if(res.data.installed != false){
            window.location.href = "/Welcome";
        }else{
            return (
                <> 
                    <Content>
                        <div className="box-dialog">
                            <Dialogs dialog={dialog}/>
                            <button type="button" onClick={() => {setDialog(dialog + 1)}}>Continuar</button>
                        </div>
                    </Content>
                    
                    <Developer>
                        Desenvolvido com 🤍 por <a href="https://github.com/myjefferson" target="_blank" rel="noreferrer"><strong>Jefferson Carvalho</strong></a>
                    </Developer>
                </>
            )
        }
    })
}