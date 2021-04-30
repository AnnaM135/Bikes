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
import SelectPayment from './components/Modal/SelectPayment';

let store = configStore()

class App extends Component {

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
            <Route path="/basket" exact component={Basket} />
            <Route path="/rules" component = {Rules} />
            <Route path = "/about"  component = {About} />
            <Route path = "/order" component = {SelectPayment}/>
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </Provider>
          // <div>
          //     {this.state.count === 1 ? 1:
          //       this.state.count === 2 ? 2:
          //       this.state.count === 3 ? 3:
          //       null
          //     }
          // </div>
    )
  }
}

export default App
