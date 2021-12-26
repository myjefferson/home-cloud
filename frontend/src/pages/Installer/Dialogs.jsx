import React, { useEffect, useState } from 'react'
import logo_home_installer from '../../assets/img/home-installer-logo.png'
import api from '../../services/api'

export default ({dialog}) => {
    const [diskspace, setDiskSpace] = useState("");

    //const [inputGeralDir, setDiskSpace] = useState("");
    //const [diskspace, setDiskSpace] = useState("");
    //const [diskspace, setDiskSpace] = useState("");
    const [inputStorage, setInputStorage] = useState("");

    //Install
    const insertInstall = () => {
        api.post('/installSystem', {
            sizeStorage: inputStorage
        })
    }

    //Get DiskSpace
    useEffect(() => {
        api.get('/diskspace').then(res => {
            const freespace = (res.data.free).toString()
            setDiskSpace(freespace.substr(0,3))
            setInputStorage(freespace.substr(0,3))
        })
    },[])

    if(dialog === 0){
        return  <div className='principal'>
                    <div className="header">
                        <img src={logo_home_installer} alt=""/>
                        <h2><strong>Bem-vindo(a) ao instalador Home Cloud</strong></h2>
                        <p>Vamos começar  configurando o armazenamento</p>
                    </div>
                    <p><strong>Digite quanto de espaço pretende ocupar do seu Disco Local, onde o HOME CLOUD foi "clonado".</strong></p>
                    <input type="number" defaultValue={diskspace} onChangeCapture={(number) => setInputStorage(number)}/><label>Valor mínimo é 10GB</label>
                    <p className='text-warning'><strong>Você tem {diskspace}GB de espaço livre</strong></p>
                </div>     
    }/*else if(props.dialog == 1){
       return <>
                <div className="header">
                    <img src={logo_home_installer}/>
                    <h2><strong>Administração de contas</strong></h2>
                    <p>Escolha se você deseja uma conta de acesso única ou permitir criação de contas.</p>
                </div>
                <div className="area-radios">
                    <div>
                        <input type="radio" name="type-account" id="single"/>
                        <label for="single">Sem contas (cloud individual)</label>
                    </div>
                    <div>
                        <input type="radio" name="type-account" id="multiple"/>
                        <label for="multiple">Disponibilizar criação de várias contas, respeitando a quantidade de espaço no disco local.</label>
                    </div>
                </div>
                <p className='text-warning'><strong>Você tem {diskspace}GB de espaço no disco local</strong></p>
            </>
    }*/else if(dialog === 1){
        return <>
                { insertInstall() }
                <div className="header">
                    <img src={logo_home_installer} alt=""/>
                    <h2><strong>Instalação completa</strong></h2>
                    <p>Vamos começar!</p>
                </div>
                <p>Se você precisou alterar algo anteriormente <strong>fique tranquilo</strong>, você consegue alterar tudo no painel de configurações.</p>
            </>
    }else if(dialog === 2){
        window.location.href = "/Welcome";
    }
}