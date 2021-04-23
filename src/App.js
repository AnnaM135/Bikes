import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import "./App.css"
import "./components/filter/filter.css"
import Filter from "./components/filter/filter"
import Home from './components/home/home';
import List from "./components/list/list"
import Contact from "./components/contact/contact"
import Basket from "./components/basket/basket"
import { Provider } from "react-redux";
import configStore from "./store/config";
import AdminLogin from './components/AdminLogin/AdminLogin.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import  Rules  from './components/Rules/Rules';
import  About  from './components/About/About';
let store = configStore()

export class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/login'><AdminLogin /></Route>
            <Route path='/admin'><AdminPanel /></Route>

            <Route path="/" exact component={Home} />

            <Route path="/filter/:type" exact render={(props) => (
              <Filter key={props.match.params.type} {...props} />)
            } />

            <Route path="/filter/:type/:item" component={List} />
            <Route path="/contact" component={Contact} />
            <Route path="/basket" component={Basket} />
            <Route path="/rules" component = {Rules} />
            <Route path = "/about"  component = {About} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
