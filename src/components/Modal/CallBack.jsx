import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import "../contact/contact.css"
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"


class CallBack extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: true
        }
    }
    
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
   
    render() {
        console.log(this.props.langData.langId)
        return (
            <div className = "payment-register" >
                <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}>{lang[this.props.langData.langId].buy} </div></a>
          <Modal show = {this.state.show} >
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body style = {{margin: "7%"}}>
              <div className = "delivery-modal-img">
                            <img src = "./images/kanxik.svg" width = "200px" />
                        </div>
                        <div className = "delivery-text-area">
                            <h1 style = {{textAlign: "center"}}>ՇՆՈՐՀԱԿԱԼՈՒԹՅՈՒՆ</h1>
                            <h1 style = {{textAlign: "center"}}>ՁԵՐ ԳՆՈՒՄԸ ԿԱՏԱՐՎԱԾ Է</h1>
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


export default  connect(mapstatetoprops, mapDispatchToProps)(CallBack)
