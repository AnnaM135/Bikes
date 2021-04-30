import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"
import UserModal from './UserModal'


class SelectCardPayment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false,
             selectBank:{
                 ameria: false,
                 idram: false,
             }
        }
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    change = (e) =>  {  
        let object = {};
        object[e.target.value] = e.target.checked
       console.log(object) 
       this.state.selectBank = object 
       this.setState({})
    }
    save = () => {
        console.log("card ")
        console.log(this.state.selectBank)
        if(this.state.selectBank.ameria == true){
            console.log("tox gna harcman ej")
        }
        else if(this.state.selectBank.idram == true){
            console.log("tox gna idrami harcman ej")
        }
        // console.log(this.state.payment)
        return null
    }
    render() {
        console.log(this.props)
        return (
             <div className = "payment-register" >
            <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>Հաջորդը </div></a>
          <Modal show = {this.state.show} >
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body style = {{margin: "7%"}}>
                  <h1>Վճարում</h1>
                  <p>Ընտրեք վճարման  տարբերակը</p>
                  <div className = "select-payment-form address">
                      <input id = "ameriaBank" value = "ameria" checked = {this.state.selectBank.ameria}  onChange = {this.change}  type = "radio" />
                      <img src = "/images/master-card.svg" />
                      <img src = "/images/visa.svg" />
                  </div>
                  <div className = "select-payment-form address">
                      <input id = "idBank" value = "idram" checked = {this.state.selectBank.idram}  onChange = {this.change}  type = "radio" />
                      <img style = {{width: "90px"}} src = "/images/idram.svg" />
                  </div>
                
                <div className = "save">
                  <div className = "save-btn" >
                      <button onClick = {this.save}>
                          {/* <UserModal /> */}
                      </button>
                  </div>
                </div>
              </Modal.Body>
          </Modal>
      </div>
        )
    }
}

function mapstatetoprops(state) {
    return {
        langData: state.langReducer
    }
}
const mapDispatchToProps = {
    changeData
}


export default connect(mapstatetoprops, mapDispatchToProps)(SelectCardPayment)
