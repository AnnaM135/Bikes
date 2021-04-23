import React, { Component } from 'react'
import "../contact/contact.css"
import Header from "../header/header"
import Footer from "../footer/Footer"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"

class About extends Component {
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    render() {
        return (
            <div className="contact-page">
                <Header  handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}/>
                <div className="contact-main">
                    <div className="about-area">
                        <img src="images/about.svg" className = "about-img" />
                    </div>
                    <div className="contact-main-right">
                        <div className="contatc-main-icons">
                            <p>{lang[this.props.langData.langId].about}</p>
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

export default  connect(mapstatetoprops, mapDispatchToProps)(About)