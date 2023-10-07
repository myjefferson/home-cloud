import { useState } from 'react'

//services
import { signUp } from '../../services/auth/auth'

const SignUp = () => {
    const [dataSignUp, setDataSignUp] = useState({
        role: 1
    })

    const handleChangeInput = (event) =>{
        const value = event.target.value
        const name = event.target.name
        setDataSignUp({ ...dataSignUp, [name]: value })
    }

    const handleSignUp = async () =>{
        await signUp(dataSignUp)
        .then(success =>{
            console.log(success)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return(
        <>
            <h1>Cadastro de conta Home Cloud</h1>
            <form>
                <div className='mt-2 mb-3'>
                    <label for="name" className="block mb-1 text-sm font-medium">Digite seu nome completo</label>
                    <input
                        required
                        type='text'
                        name='name'
                        className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        defaultValue=""
                        id="name"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-2 mb-3'>
                    <label for="username" className="block mb-1 text-sm font-medium">Digite seu melhor email</label>
                    <input
                        required
                        type='text'
                        name='username'
                        className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        defaultValue=""
                        id="username"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-2 mb-3'>
                    <label for="password" className="block mb-1 text-sm font-medium">Digite sua senha</label>
                    <input
                        required
                        type='text'
                        name='password'
                        className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        defaultValue=""
                        id="password"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-2 mb-3'>
                    <label for="passwordRepeat" className="block mb-1 text-sm font-medium">Repita sua senha</label>
                    <input
                        required
                        type='text'
                        name='passwordRepeat'
                        className='shadow-sm border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        defaultValue=""
                        id="passwordRepeat"
                        onChange={handleChangeInput}
                    />
                </div>
                <button type='button' onClick={handleSignUp}>Criar Conta</button>
            </form>
        </>
    )
}

export default SignUp