import React, { Component } from 'react'
import Rules from "../Rules/Rules"
import { Route, Link } from 'react-router-dom';

import "./footer.css"
export class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userInp: {
                 name: "",
                 surname: ""
             }
        }
    }
    
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
                            <h1><a className="link-white" href = "https://www.google.com/maps/place/27+Hovsep+Emin+St,+Yerevan,+%D0%90%D1%80%D0%BC%D0%B5%D0%BD%D0%B8%D1%8F/@40.2055056,44.4917094,17z/data=!3m1!4b1!4m5!3m4!1s0x406abd430f090d15:0x5071f9df544d43e!8m2!3d40.2055056!4d44.4938981">ՀՀ, ք. Երևան, Հ.Էմին 27տ</a></h1>
                             <div className="contact-media">
                             <a style = {{textDecoration: "none"}} href="https://www.instagram.com/hecanivclub.am/"><i className="fa fa-instagram"></i></a> 
                             <a style = {{textDecoration: "none"}} href="https://www.facebook.com/BestBikesInArmenia"><i className="fa fa-facebook"></i></a>
                             <a href="mailto:hecanivclubam@gmail.com?subject=SweetWords&body=Please send me a copy of your new program!"> <img  src = "/images/gmail.svg"></img></a>

                                <a href="https://vm.tiktok.com/ZSJBrYGuv/"><img src = "/images/tiktok.svg"></img></a> 
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

export default Footer
