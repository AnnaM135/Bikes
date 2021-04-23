import React, { Component } from 'react'
import "../contact/contact.css"
import Header from "../header/header"
import Footer from "../footer/Footer"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"

class Rules extends Component {
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    render() {
        return (
            <div className="contact-page">
                <Header  handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}/>
                <div className="rules-main">
                    <div className="rules-main-left">
                        <img className = "rules-img" src="images/payman.svg" />
                    </div>
                    <div className="rules-main-right">
                       <h4>{lang[this.props.langData.langId].rulesOne}</h4>
                        <p>{lang[this.props.langData.langId].rulesTwo}</p>
                        <h4>{lang[this.props.langData.langId].rulesThree}</h4>
                        <p>{lang[this.props.langData.langId].rulesFour}</p>
                        <h4>{lang[this.props.langData.langId].rulesFive}</h4>
                        <p>{lang[this.props.langData.langId].rulesSix}</p>
                        <p> <div className="rules-pay-versions">
                                <img src="images/ameria.svg"/>
                                <img src="images/master-card.svg" />
                                <img src="images/visa.svg" />
                                <img src="images/idram.svg" />
                            </div>  
                            {lang[this.props.langData.langId].rulesSeven}</p>
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

export default connect(mapstatetoprops, mapDispatchToProps)(Rules)
