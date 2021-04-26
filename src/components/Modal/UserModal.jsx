import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"


class UserModal extends Component {
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
            <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>Հաջորդը </div></a>
          <Modal show = {this.state.show} >
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body style = {{margin: "7%"}}>
                  <h3 >Մուտքագրեք</h3>
                  <h3 >Անուն Ազգանուն</h3>
                        <div className = "payment-form address" style = {{marginTop: "100px"}}>
                            <input className = "payment-input" type = "email" placeholder = "Անուն"/>
                        </div>
                        <div className = "payment-form address" >
                            <input className = "payment-input" type = "email" placeholder = "Ազգանուն"/>
                        </div>
                
                <div className = "save">
                  <div className = "save-btn">
                      <button>Հաջորդը
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


export default connect(mapstatetoprops, mapDispatchToProps)(UserModal)
