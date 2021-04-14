import React, { Component } from 'react'
import {BrowserRouter, Route } from 'react-router-dom';
import "./App.css"
import "./components/filter/filter.css"
import Filter from "./components/filter/filter"
import Home from './components/home/home';
import List from "./components/list/list"
import Contact from "./components/contact/contact"
import Basket from "./components/basket/basket"
import {Provider} from "react-redux";
import configStore from "./store/config";

let store = configStore()
console.log(store)

export class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <BrowserRouter>
        <Route path = "/" exact component = {Home}/>
        <Route path = "/filter/:type" exact  component = {Filter} />
        <Route path = "/filter/:type/:item" component = {List} />
        <Route path = "/contact" component ={Contact} />
        <Route path = "/basket" component = {Basket} /> 
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App
