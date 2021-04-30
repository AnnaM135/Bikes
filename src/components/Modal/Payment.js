import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../contact/contact.css"
import SelectPayment from './SelectPayment'
import AdminServices from '../../services/AdminServices'
import {Redirect, Link} from "react-router-dom"
import SelectCardPayment from './SelectCardPayment'


class Payment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           orderInput: {
                name: "sdg",
                surname: "sdvg",
                email: "sdg",
                phone: "4351234567891", 
                address: "adf",
                homeAddress: "asf"
           },
           show: false,
           page: false,
           error: ""
        }
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    nextModal(){
        this.setState(prevState =>({
            currentModal: prevState.currentModal + 1
        }))
    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    change(e){
        let k = e.target.getAttribute("data-id")
        this.state.orderInput[k] = e.target.value
        this.setState({})
    }
    save = () =>{
        this.state.error = ""
        for(let i in this.state.orderInput){
            if(this.state.orderInput[i] == ""){
                this.state.error = "Լրացրեք բոլոր դաշտերը"
            }
            else if(this.state.orderInput.phone.length < 12){
                this.state.error = "Հեռախոսահամարն ամբողջական չէ"
            }
        }
        this.setState({})
        if(this.state.error  == ""){
            this.props.setState({
                currentModal:2,
                firstModal: this.state.orderInput
            })
            this.props.setState({})

        }
    }
    render() {
        console.log(this.props)
        // alert(JSON.stringify(this.props.state))
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
                        <h1 className = "alert-dark">{this.state.error}</h1>
                        <div className = "payment-label" style = {{marginTop: "100px"}}>
                            <label htmlFor = "name">Մուտքագրեք Անուն</label>
                        </div>
                        <div className = "payment-form">
                            <input data-id = "name" value = {this.state.orderInput.name} onChange = {this.change.bind(this)} className = "payment-input" type = "text" placeholder = "Անուն"/>
                        </div>
                        <div className = "payment-label">
                            <label htmlFor = "surname">Մուտքագրեք Ազգանուն:</label>
                        </div>
                        <div className = "payment-form">
                            <input data-id = "surname" value = {this.state.orderInput.surname} onChange = {this.change.bind(this)} className = "payment-input" type = "text" placeholder = "Ազգանուն"/>
                        </div>
                        <div className = "payment-label">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                            <label htmlFor = "email">Մուտքագրեք Ձեր էլ. փոստի հասցեն:</label>
                        </div>
                        <div className = "payment-form">
                            <input data-id = "email" value = {this.state.orderInput.email} onChange = {this.change.bind(this)} className = "payment-input" type = "email"/>
                        </div>
                        <div className = "payment-label">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            <label htmlFor = "phone">Հեռախոսահամար</label>
                        </div>
                        <div className = "payment-form">
                            <input data-id = "phone" value = {this.state.orderInput.phone} onChange = {this.change.bind(this)} className = "payment-input" type = "number"/>
                        </div>
                        <div className = "payment-label">
                            <i class="fa fa-home" aria-hidden="true"></i>
                            <label htmlFor = "address">Հասցե</label>
                        </div>
                        <div className = "payment-form address">
                            <input data-id = "address" value = {this.state.orderInput.address} onChange = {this.change.bind(this)} className = "payment-input" type = "email" placeholder = "Քաղաք/գյուղ"/>
                        </div>
                        <div className = "payment-form address" >
                            <input data-id = "homeAddress" value = {this.state.orderInput.homeAddress} onChange = {this.change.bind(this)} className = "payment-input" type = "email" placeholder = "Տան հասցե"/>
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
                            <button onClick = {() => this.save()} >                          
                                Հաստատել                               
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
