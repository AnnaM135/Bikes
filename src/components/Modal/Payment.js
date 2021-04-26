import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"
import SelectPayment from './SelectPayment'

class Payment extends Component {
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
                  <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>{lang[this.props.langData.langId].buy} </div></a>
                <Modal show = {this.state.show} >
                    <Modal.Footer>
                        <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </p>
                    </Modal.Footer>
                    <Modal.Body style = {{margin: "7%"}}>
                        <h1>Լրացրեք դաշտերը</h1>
                        <div className = "payment-label">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                            <label>Մուտքագրեք Ձեր էլ. փոստի հասցեն:</label>
                        </div>
                        <div className = "payment-form">
                            <input className = "payment-input" type = "email"/>
                        </div>
                        <div className = "payment-label">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            <label>Հեռախոսահամար</label>
                        </div>
                        <div className = "payment-form">
                            <input className = "payment-input" type = "email"/>
                        </div>
                        <div className = "payment-label">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <label>Հասցե</label>
                        </div>
                        <div className = "payment-form address">
                            <input className = "payment-input" type = "email" placeholder = "Քաղաք/գյուղ"/>
                        </div>
                        <div className = "payment-form address" >
                            <input className = "payment-input" type = "email" placeholder = "Տան հասցե"/>
                        </div>
                       <div className = "hours-delivery">
                            <img src = "/images/vjarum.svg" />
                            <p>Նշեք առաքման Ձեր նախընտրելի ժամը</p>
                            <div className = "payment-select">
                                <select>
                                    <option>17:00-18:00</option>
                                </select>
                            </div>
                       </div>
                      <div className = "save">
                        <div className = "save-btn">
                            <button>
                                <SelectPayment />
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

export default connect(mapstatetoprops, mapDispatchToProps)(Payment)
