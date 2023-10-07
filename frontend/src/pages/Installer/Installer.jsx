//style
import {Content, Developer} from './style/installer'
import {DialogInstallerStyle} from './style/dialogInstaller'
import DialogsInstaller from './DialogsInstaller'
import api from '../../services/api'
import { installCloud } from '../../services/config'

const Installer = () => {


    const handleCompleteInstallation = async (dataInstallation) =>{
      const registerUser = await api.post('/createUser', dataInstallation)
      .then(success => {
        return true
      }).catch(error => {
        console.log("Ocorreu um erro no servidor")
      })
      const registerInstall = await installCloud(dataInstallation)
      .then(success => { return true })
      .catch(error => {
        console.log("Ocorreu um erro no servidor")
      })

      if(registerUser && registerInstall)
        window.location.href = "/";
    }
  
    //Verify Installer
    return (
        <> 
            <Content>
                <div className="box-dialog">
                  <DialogInstallerStyle>
                    <DialogsInstaller 
                      handleCompleteInstallation={handleCompleteInstallation}
                    />        
                  </DialogInstallerStyle>
                </div>
            </Content>
            
            <Developer>
                Desenvolvido com 🤍 por <a href="https://github.com/myjefferson" target="_blank" rel="noreferrer"><strong>Jefferson Carvalho</strong></a>
            </Developer>
        </>
    )

    // api.get('/verifyInstall').then(res => {
    //     if(res.data.installed !== false){
    //         window.location.href = "/Welcome";
    //     }else{
            
    //     }
    // })
}

export default Installer;