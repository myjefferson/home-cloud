import { useEffect, useState } from 'react'
import logo_home_installer from '../../assets/img/home-installer-logo.png'
import api from '../../services/api'
import Modal from '../../components/Modal/Modal';

const DialogsInstaller = ({ handleCompleteInstallation }) => {
    const [diskspace, setDiskSpace] = useState("");
    const [inputDataInstall, setInputDataInstall] = useState({
        role: 1,
        name: null,
        email: null,
        password: null,
    });
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = 3;
    const [skipped, setSkipped] = useState(new Set());
    const [openModal, setOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({
        title: null,
        body: null,
        buttonTitle: null
    })
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleChangeInput = (event) => {
        const { name, value } = event.target
        setInputDataInstall({
            ...inputDataInstall, 
            [name]: value
        })
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        if(!inputDataInstall.name){
            setOpenModal(true)
            setDataModal({
                title: 'Ops! Preencheu tudo mesmo?',
                body: 'Por favor, digite seu nome completo.',
                buttonTitle: 'Preencher',
            })
            
            return; 
        }
        if(!inputDataInstall.email){
            setOpenModal(true)
            setDataModal({
                title: 'Ops! Preencheu tudo mesmo?',
                body: 'Por favor, digite seu melhor email.',
                buttonTitle: 'Preencher',
            })
            
            return; 
        }
        if(!inputDataInstall.password){
            setOpenModal(true)    
            setDataModal({
                title: 'Ops! Preencheu tudo mesmo?',
                body: 'Por favor, digite uma senha.',
                buttonTitle: 'Preencher',
            })
            
            return; 
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleInstall = () =>{
        inputDataInstall['defined_storage'] = diskspace
        handleCompleteInstallation(inputDataInstall)
    }

    //Get DiskSpace
    useEffect(() => {
        api.get('/diskspace').then(res => {
            const freespace = (res.data.free).toString()
            setDiskSpace(freespace.substr(0,3))        
        })
    },[])

    const titlesHeader = [
        'Bem-vindo(a) ao instalador Home Cloud',
        'Vamos começar  configurando o armazenamento',
        'Administração de contas',
        'Instalação completa'
    ]

    return (
    <>        
        <Modal
            title={dataModal.title}
            body={dataModal.body}
            buttonTitle={dataModal.buttonTitle}
            open={openModal}
            setOpen={setOpenModal}
            buttons={[
                {
                    titleButton: "Preencher", 
                    actionButton: () => { setOpenModal(false) },
                    bgColor: 'bg-blue-600 hover:bg-blue-500'
                }
            ]}
            hiddenCancel={true}
        />

        <div className="header flex flex-col items-center">
            <img src={logo_home_installer} alt="Home Cloud Installer" className='w-40'/>
            <h2><strong>{titlesHeader[activeStep]}</strong></h2>
        </div>

        {[
            activeStep === 0 &&
            <div className='start-dialog'>
                <h3>Cadastro de conta</h3>
                <p><b>Antes de começar a configurar o armazenamento, cadastre uma conta administrativa.</b></p>
                <div
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { marginBottom: 2, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <div className='mt-2 mb-3'>
                            <label for="name" className="block mb-1 text-sm font-medium">Seu nome</label>
                            <input
                                required
                                type='text'
                                name='name'
                                className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                label="Nome"
                                defaultValue=""
                                id="name"
                                value={inputDataInstall.name}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='mt-2 mb-3'>
                            <label for="name" className="block mb-1 text-sm font-medium">Seu melhor email</label>
                            <input
                                required
                                type='email'
                                name='email'
                                label="Email"
                                defaultValue=""
                                id="outlined-required"
                                className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                value={inputDataInstall.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='mt-2 mb-3'>
                            <label for="name" className="block mb-1 text-sm font-medium">Senha</label>
                            <input
                                required
                                type='password'
                                name='password'
                                label="Senha"
                                defaultValue=""
                                id="outlined-required"
                                className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                value={inputDataInstall.password}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                </div>
            </div>     

            ,

            activeStep === 1 &&
            <div>
                <p><strong>Digite quanto de espaço pretende ocupar do seu Disco Local, onde o HOME CLOUD foi "clonado".</strong></p>
                <input 
                    name='defined_storage'
                    type="number" 
                    className='input-disk-space' 
                    defaultValue={diskspace}
                    onChange={handleChangeInput}
                />
                <p>Valor mínimo é 10GB</p>
                <p className='text-warning'><strong>Você tem {diskspace}GB de espaço livre</strong></p>
            </div>
            
            ,

            activeStep === 2 &&
            <>
                <p>Escolha se as contas serão limitadas a  uma quantidade de GBs especificos ou se serão ilimitadas.</p>
                <div>
                    {['unlimited', 'accounts'].map((item, index) => (
                        <>
                            <input
                                key={index}
                                id={item}
                                type='radio'
                                color="default"
                                value={item}
                                name='installation_type'
                                onChange={handleChangeInput}
                            />
                            <label for={item} >
                                {item}
                            </label>
                            { item === 'unlimited' && <p>Apenas uma conta será criada</p> }
                            { item === 'accounts' && <p>limitar contas em até</p> }
                        </>
                    ))}
                </div>
            </>

            ,

            activeStep === 3 &&
            <>
                <p>Vamos começar!</p>
                <p>Se você precisou alterar algo anteriormente <strong>fique tranquilo</strong>, você consegue alterar tudo no painel de configurações.</p>
            </>
        ]}

        <div>
            { activeStep > 0 &&
                <button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Voltar
                </button>
            }
            <button onClick={activeStep < totalSteps ? handleNext : handleInstall }>
                {activeStep === totalSteps ? 'Concluir' : 'Continuar'}
            </button>
        </div>
    </>)
}

export default DialogsInstaller