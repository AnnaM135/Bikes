import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import "../contact/contact.css"


class SelectPayment extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
             show: true,
             payment: {
                 card: false,
                 pay: false,
                 credit: false
             },
             error: "",
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
        for(let i in this.state.payment){
            if(this.state.payment[i] == true){
                if(this.state.payment.card == true){
                    this.props.setState({
                        currentModal:3,
                        // firstStep: this.state.payment
                    })
                }
                else if(this.state.payment.pay == true){
                    this.props.setState({
                        currentModal:4,
                        // firstStep: this.state.payment
                    })
                }
                
            }
            else{
                console.log("false")
            }
        }
       
        console.log(this.state.payment)
    }
    render() {
        console.log(this.props.first)

        // alert(JSON.stringify(this.props.state.firstStep))
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
                  <h1 className = "alert-dark">{this.state.error}</h1>
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
                      <button onClick = {() => this.save()} >
                            Հաջորդը
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
