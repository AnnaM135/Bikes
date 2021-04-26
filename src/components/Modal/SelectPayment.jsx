import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"
import SelectCardPayment from './SelectCardPayment'


class SelectPayment extends Component {
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    constructor(props) {
        super(props)
    
        this.state = {
             show: false
        }
    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <div className = "payment-register" >
            <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>Հաստատել </div></a>
          <Modal show = {this.state.show} >
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body style = {{margin: "7%"}}>
                  <h1>Ընտրեք վճարման  տարբերակը</h1>
                  <div className = "select-payment-form  address">
                      <input type = "radio" />
                      <img src = "/images/pay-card.svg" />
                      <span>Առցանց</span>
                  </div>
                  <div className = "select-payment-form  address">
                      <input type = "radio" />
                      <img src = "/images/pay-pay.svg" />
                      <span>Կանխիկ</span>
                  </div>
                  <div className = "select-payment-form  address">
                      <input type = "radio" />
                      <img src = "/images/pay-credit.svg" />
                      <span>Ապառիկ</span>
                  </div>
                  
                <div className = "save">
                  <div className = "save-btn">
                      <button >

                          <SelectCardPayment />
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
