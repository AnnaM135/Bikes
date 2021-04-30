import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"


class UserModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false
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

    render() {
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
              <div className = "delivery-modal-img">
                            <img src = "./images/delivery.svg" width = "200px" />
                        </div>
                        <div className = "delivery-text-area">
                            <h1>ՇՆՈՐՀԱԿԱԼՈՒԹՅՈՒՆ</h1>
                            <h1>ՁԵՐ ԳՆՈՒՄԸ ԿԱՏԱՐՎԱԾ Է</h1>
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


export default connect(mapstatetoprops, mapDispatchToProps)(UserModal)
