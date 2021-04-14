import React, { Component } from 'react'
import Header from "../header/header"
import Footer from "../footer/Footer"
import "./contact.css"
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"

export class Contact extends Component {
    handelChangeLang = (id) =>{
        this.props.changeData(id)
        console.log(id)
    }
    render() {
        return (
            <div className="contact-page">
            <Header  handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
 <div className="contact-main-head">
     <h3 className="">Կապ հաստատեք մեզ հետ {lang[this.props.langData.langId].color}</h3>			
 </div>
 <div className="contact-main">
     <div className="contatc-main-left">
         <img src="images/contact-bicycle.svg" />
     </div>
     <div className="contact-main-right">
         <div className="contatc-main-icons">
             <i className="fa fa-phone"></i>
             <i className="fa fa-instagram"></i>
             <i className="fa fa-facebook"></i>
         </div>
         <div className="contact-main-info">
              <a href="tel">+374 44 44 44</a>
              <a href="https://www.instagram.com/hecaniv.am/">hecaniv.am</a>
              <a href="https://www.facebook.com/BestBikesInArmenia/">hecaniv.am</a>
         </div>
     </div>
 </div>
 <Footer />
</div>
        )
    }
}

function mapstatetoprops(state){
    return{
        langData: state.langReducer
    }
}
const mapDispatchToProps = {
     changeData
}


export default  connect(mapstatetoprops, mapDispatchToProps)(Contact)
