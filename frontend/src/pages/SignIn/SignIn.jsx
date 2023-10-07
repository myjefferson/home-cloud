import React, { useState, useContext } from 'react'

//services
import { AuthContext } from '../../services/auth/AuthProvider'

const SignIn = () => {
    const [dataSignIn, setDataSignIn] = useState()
    const { signIn } = useContext(AuthContext)

    const handleChangeInput = (event) =>{
        const value = event.target.value
        const name = event.target.name
        setDataSignIn({ ...dataSignIn, [name]: value })
    }

    const handleSignIn = async () =>{
        await signIn(dataSignIn.username, dataSignIn.password)
        .then(success =>{
            console.log(success)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return(
        <>
            <form>
                <div className='mt-2 mb-3'>
                    <label for="username" className="block mb-1 text-sm font-medium">Seu email</label>
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
                    <label for="password" className="block mb-1 text-sm font-medium">Sua senha</label>
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
                <button type='button' onClick={handleSignIn}>
                    Entrar
                </button>
            </form>
        </>
    )
}

export default SignIn