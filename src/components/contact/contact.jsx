import React, { Component } from 'react'
import Header from "../header/header"
import Footer from "../footer/Footer"
import "./contact.css"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"

export class Contact extends Component {
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    render() {
        return (
            <div className="contact-page">
                <Header handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId} />
                <div className="contact-main-head">
                    <h3>Կապ հաստատեք մեզ հետ</h3>
                </div>
                <div className="contact-main">
                    <div className="contatc-main-left">
                        <img src="images/contact-bicycle.svg" />
                    </div>
                    <div className="contact-main-right">
                        <div className="contatc-main-icons">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <i className="fa fa-phone"></i>
                            <i className="fa fa-instagram"></i>
                            <i className="fa fa-facebook"></i>
                            <i className="fa fa-google-plus-official" aria-hidden="true"></i>
                            <img style = {{margin: "10px", width: "26px"}} src = "./images/tiktokBlack.svg"></img>
                        </div>
                        <div className="contact-main-info">
                            <a>ՀՀ, ք. Երևան, Հ.Էմին 27տ</a>
                            <a href="tel:+37444004405">++37444 004405</a>
                            <a href="https://www.instagram.com/hecanivclub.am/">hecaniv.am</a>
                            <a href="https://www.facebook.com/BestBikesInArmenia">hecaniv.am</a>
                            <a href="https://www.facebook.com/BestBikesInArmenia">hecaniv@gmail.com</a>
                            <a href="https://vm.tiktok.com/ZSJBrYGuv/">hecaniv.tiktok   </a>
                        </div>
                    </div>
                </div>
                <Footer />
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


export default connect(mapstatetoprops, mapDispatchToProps)(Contact)
