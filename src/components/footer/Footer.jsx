import React, { Component } from 'react'
import ModalFooter from '../Modal/ModalCallBack'
import ModalRules from '../Modal/ModalRules'
import "./footer.css"
export class Footer extends Component {
    render() {
        return (
            <footer className="footer" id = "footer">
                <div className="footer-contacts">
                    <div className="call-back">
                        <h1><ModalFooter /></h1>
                        <h1></h1>
                        <ModalRules />
                    </div>
                    
                    <div className="fotter-line"></div>
                    <div className="call-back">
                        <div className="contact-icons">
                            <i className="fa fa-phone"></i>
                            <i>+374444444</i>	
                        </div>

                        <div className="contact-media">
                            <i className="fa fa-instagram"></i>
                            <i className="fa fa-facebook"></i>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="end">
                        <div className="hr"></div>
                        <div className="rights">© 2021 Sdesign. All Rights Reserved.</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
