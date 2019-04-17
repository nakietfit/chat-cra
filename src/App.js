import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Chat from './containers/Chat'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import './style.scss'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/message/:id" component={Chat} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={LogIn} />
                </Switch>
            </BrowserRouter>
        )
    }
}