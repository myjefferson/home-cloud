import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

//Pages
import Welcome from './pages/Welcome/Welcome'
import MyCloud from './pages/MyCloud/MyCloud'
import Installer from './pages/Installer/Installer'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Installer} />
                <Route path="/MyCloud" component={MyCloud} />
                <Route path="/Welcome" component={Welcome} />
                <Route path="*" component={Welcome} />
            </Switch>
        </BrowserRouter>
    )
}