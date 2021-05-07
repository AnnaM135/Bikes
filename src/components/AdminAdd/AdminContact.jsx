import React, { Component } from 'react'
import AdminPanel from '../AdminPanel/AdminPanel'

export class AdminContact extends Component {
    render() {
        return (
            <>
            <div className = "admin-header-black"></div>
            <div className = "admin-page-main">
                <AdminPanel />
            <div className = "admin-another-page">
               <div className = "archive-trash">
                <div className = "archive-elements">
                    <h4>Կոնկտներ</h4>
                    <div className = "archive-icon">
                        <h4>Արխիվ</h4>
                        <i class="fa fa-archive" aria-hidden="true"></i>
                    </div>
                </div>
                
            </div>
                <div className = "admin-header-search">
                    <div className = "admin-search-area">
                        <input type = "text" placeholder = "Փնտրել"/>
                        <img src = "/images/admin-search.svg" />
                    </div>
                </div>
                <div className = "admin-add-section">
                    <div className = "admin-contact-page">
                        <div className = "admin-contact-img">
                                <img src="/images/contact-bicycle.svg" />
                        </div>

                        <div className = "admin-contact-info">
                                <div className="contatc-main-icons">
                                    <br />
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    <i className="fa fa-phone"></i>
                                    <i className="fa fa-instagram"></i>
                                    <i className="fa fa-facebook"></i>
                                    <i className="fa fa-google-plus-official" aria-hidden="true"></i>
                                    <img style = {{margin: "10px", width: "26px"}} src = "/images/tiktokBlack.svg"></img>
                                </div>
                                <div className="contact-main-info">
                                    {/* <label>Կապ հաստատեք մեզ հետ</label> */}
                                     <input type = "text"  value = "Կապ հաստատեք մեզ հետ"/>
                                    <a href = "https://www.google.com/maps/place/27+Hovsep+Emin+St,+Yerevan,+%D0%90%D1%80%D0%BC%D0%B5%D0%BD%D0%B8%D1%8F/@40.2055056,44.4917094,17z/data=!3m1!4b1!4m5!3m4!1s0x406abd430f090d15:0x5071f9df544d43e!8m2!3d40.2055056!4d44.4938981">ՀՀ, ք. Երևան, Հ.Էմին 27տ</a>
                                    <a href="tel:+37444004405">+37444 004405</a>
                                    <a href="https://www.instagram.com/hecanivclub.am/">hecanivclub.am</a>
                                    <a href="https://www.facebook.com/BestBikesInArmenia">hecanivclub.am</a>
                                    <a href="mailto:hecanivclubam@gmail.com?subject=SweetWords&body=Please send me a copy of your new program!">hecanivclubam@gmail.com</a>

                                    <a href="https://vm.tiktok.com/ZSJBrYGuv/">hecaniv.tiktok   </a>
                                </div>
                                <div className="contatc-main-icons-edit">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>    
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
            </>
        )
    }
}

export default AdminContact
