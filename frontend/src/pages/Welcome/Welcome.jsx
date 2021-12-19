import React, {useEffect} from 'react'
import {Container} from '@material-ui/core'
import {Content, NavWelcome} from './style/welcome'
import api from '../../services/api'

import logoWhite from '../../assets/img/logo-home-cloud-white.svg'

export default function Welcome(){

    //Verify Installer
    useEffect(() => {
        api.get('/verifyInstall').then(res => {
            if(!res.data.installed){
                window.location.href = "/";
            }
        })
    },[])

    return(
        <>
            <Container>
                <NavWelcome>
                    <Container>
                        <img src={logoWhite} alt="HOME CLOUD"/>
                        <ul>
                            {/*<li><button type="button">Gerenciamento da Cloud</button></li>*/}
                        </ul>
                    </Container>
                </NavWelcome>
                <Content>
                    <div>
                        <div>
                            <h2>Bem-vindo a</h2>
                            <h1>HOME CLOUD</h1>
                            <h3>A sua núvem em casa!</h3>
                        </div>
                        <div className='controls'>
                            <a type="button" href="/MyCloud?dir=cloud">Entrar</a>
                            {/*<a type="button" href="/">Criar conta</a>*/}
                        </div>
                    </div>
                    <footer>Desenvolvendo com <label style={{color: "#FF4646"}}>❤</label> por <a href="https://github.com/myjefferson" target="_blank" rel="noreferrer"><strong>Jefferson Carvalho</strong></a></footer>
                </Content>
            </Container>
        </>
    )
}