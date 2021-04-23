import React, { Component } from 'react'
import Rules from "../Rules/Rules"
import { Route, Link } from 'react-router-dom';

import "./footer.css"
export class Footer extends Component {
    render() {
        return (
            <footer className="footer" id = "footer">
                <div className="footer-contacts">
                    <div className="call-back">
                        <a href = "/contact" className = "link-white"><h1>ՀԵՏԱԴԱՐՁ ԿԱՊ</h1></a>  
                        <Link to = "/rules" className = "link-white"><h1>ՊԱՅՄԱՆՆԵՐ և ԿԱՆՈՆՆԵՐ</h1></Link>
                        <Link to = "/about" className = "link-white"><h1>ՄԵՐ ՄԱՍԻՆ</h1></Link>  
                    </div>
                    
                    <div className="fotter-line"></div>
                    <div className="call-back">
                        
                            <i className="fa fa-phone"></i>
                            <a className="link-white" href = "tel:+37444004405" style = {{marginLeft: "10px",fontSize: "18px"}}>+37444 004405</a>	
                        <div className="contact-icons">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <h1>ՀՀ, ք. Երևան, Հ.Էմին 27տ</h1>
                             <div className="contact-media">
                                <i className="fa fa-instagram"></i>
                                <i className="fa fa-facebook"></i>
                                <img  src = "./images/gmail.svg"></img>
                                <img src = "./images/tiktok.svg"></img>
                            </div>
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
{/* <Route path = "/rules" component ={Rules} /> */}

export default Footer
