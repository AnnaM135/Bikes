import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"
import SelectCardPayment from './SelectCardPayment'


class SelectPayment extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
             show: true,
             payment: {
                 card: false,
                 pay: false,
                 credit: false
             }
        }
    }
    change = (e) =>  {  
        let object = {};
        object[e.target.value] = e.target.checked
       console.log(object) 
       this.state.payment = object 
       this.setState({})
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
 
    save = () => {
        console.log("ok ")
        if(this.state.payment.pay == true){
            console.log("tox gna shnorhakalutyan ej")
        }
        else if(this.state.payment.card == true){
            console.log("tox gna cardi @ntrutyan ej")
        }
        console.log(this.state.payment)
        return null
    }
    render() {
        console.log(this.props)
        return (
           
            <div className = "payment-register" >
               
            {/* <a className = "link-white" onClick = {() => {this.handleModal()}}><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}  > SelectModal</div></a> */}
          <Modal show = {this.state.show} >
              {console.log("testtt 2rd modal", this.state.show)}
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body style = {{margin: "7%"}}>
                  <h1>Ընտրեք վճարման  տարբերակը</h1>
                  <div className = "select-payment-form  address">
                      <input id = "cards" value = "card" checked = {this.state.payment.card} onChange = {this.change} type = "radio"  />
                      <img src = "/images/pay-card.svg" />
                      <label htmlFor = "cards">Առցանց</label>
                  </div>
                  <div className = "select-payment-form  address">
                      <input id = "payy" value = "pay" checked = {this.state.payment.pay} onChange = {this.change} type = "radio"  />
                      <img src = "/images/pay-pay.svg" />
                      <label htmlFor = "payy">Կանխիկ</label>
                  </div>
                  <div className = "select-payment-form  address">
                      <input id = "creditCard" value = "credit"  checked = {this.state.payment.credit} onChange = {this.change} type = "radio"  />
                      <img src = "/images/pay-credit.svg" />
                      <label htmlFor = "creditCard">Ապառիկ</label>
                  </div>

                <div className = "save">
                  <div className = "save-btn">
                      <button onClick = {this.save}>
                          {/* <SelectCardPayment  {...this.props} data = {this.state.payment}/> */}
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

export default connect(mapstatetoprops, mapDispatchToProps)(SelectPayment)
