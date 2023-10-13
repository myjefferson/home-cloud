import React, { useContext } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

//Pages
import Welcome from './pages/Welcome/Welcome'
import MyCloud from './pages/MyCloud/MyCloud'
import Installer from './pages/Installer/Installer'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'

//services
import { AuthContext, AuthProvider } from './services/auth/AuthProvider'

const RoutesApp = () => {

    const Private = ({
        children,
    }) => {
        const { installed, loading } = useContext(AuthContext)

        if(!installed){
            return <Navigate to='/installer'/>
        }

        return children
    }

    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={ <Installer/> } exact path="/installer" />
                    <Route element={ <Private> <MyCloud/> </Private> } path="/cloud/:urlDirectory" />
                    <Route element={ <Private> <SignIn/> </Private> } path="/signIn" />
                    <Route element={ <Private> <SignUp/> </Private> } path="/signUp" />
                    <Route element={ <Private> <Welcome/> </Private> } path="/" />
                    {/* <Route path="*" component={ErrorPage} /> */}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RoutesApp