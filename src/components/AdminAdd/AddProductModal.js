import React, { Component } from 'react'
import {Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../AdminPanel/AdminPanel.css"
import classnames from "classnames";



class AddProductModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false,
             showMenu: false,
             menu: [
                 "Հեծանիվներ", "saylak", "tonacar"
             ]
        }
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    handelClickMenu = (event) => {
        this.setState((prevState) => ({
            showMenu: !prevState.showMenu,
        }))
    }

    handelClickFlag = (event) => {
        const { id } = event.target.dataset;
        // console.log(id)
        // if (this.state.data.sizes !== id) {
        //     this.state.data.sizes = id
        //   //this.props.handelChangeLang(id)
        //   this.setState({
        //     showList: false,
        //   })
        //   console.log(this.state.data.sizes, id)
        // }
      }

    render() {
        const cnMenu = classnames({ "menu-list": true, "not-active": !this.state.showMenu,})
        const currentType = this.state.menu.find((type) => type.id == this.state.menu)
        return (
           <div className = "payment-register" >
            <a><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>Ավելացնել </div></a>
          <Modal show = {this.state.show} size = "lg">
              <Modal.Footer>
                  <p className = "modal-close-btn"  onClick = {() => {this.handleModal()}}>
                      <i class="fa fa-times" aria-hidden="true"></i>
                  </p>
              </Modal.Footer>
              <Modal.Body>
                        <div className = "admin-modal-img">
                            <img src = "./images/addPhoto.svg" width = "200px" />
                        </div>

                       <div className = "admin-add-body">
                            <div className = "admin-add-left">
                                <div className = "admin-add-types">
                                    <p>Ընտրել բաժինը</p>
                                    <p>Անվանում</p>
                                    <p>Գույն</p>
                                    <p>Չափ</p>
                                    <p>Հասակ</p>
                                    <p>Նկարագիր</p>
                                    <p>Զեղչ</p>
                                    <p>Արժեք</p>
                                    <p>Ակցիա</p>
                                    <p>Լավագույն առաջարկ</p>
                                </div>
                            </div>
                            <div className = "admin-add-right">
                                <div onClick={this.handelClickMenu} className = "admin-select-menu-types">
                                    <div className = "dropdown-menu-admin">
                                        <p>{this.state.menu[0]}</p>
                                        <ul className = {cnMenu} onClick={this.handelClickFlag}>
                                            
                                                    <li >
                                                    <button  type="button" className = "active-btn">
                                                        <p selected value = ""></p>
                                                        <p data-id="heco">heco</p>
                                                    </button>
                                                    </li>                                                                                            
                                        </ul>
                                    </div>
                                   <i style = {{cursor: "pointer"}} class="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Հայերեն"/>
                                        <input placeholder = "Ռուսերեն"/>
                                        <input placeholder = "Անգլերեն" />
                                    </div>

                                </div>
                                <div >
                                    <div className = "admin-add-product-color">
                                            <input type="color" value="#B42F32" />
                                        
                                            <input type="color" value="#E8A631" />
                                        
                                            <input type="color" value="#E3E3CD" />
                                        
                                            <input type="color" value="#878D92" />
                                        
                                            <input type="color" value="#49494D" />
                                        <a>Ավելին</a>
                                    </div>
                                </div>
                                <div className = "admin-select-menu-types">
                                   <p>Չափս</p>
                                   <i class="fa fa-angle-down" aria-hidden="true"></i>

                                </div>
                                <div className = "admin-select-menu-types">
                                   <p>Հասակ</p>
                                   <i class="fa fa-angle-down" aria-hidden="true"></i>

                                </div>
                                <div >
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Հայերեն"/>
                                        <input placeholder = "Ռուսերեն"/>
                                        <input placeholder = "Անգլերեն" />
                                    </div>
                                </div>
                                <div className = "admin-select-menu-sale">
                                    <label class="container">
                                        <input type="checkbox"/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div> 
                                <div className = "admin-select-menu-price">
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Հին գին"/>
                              
                                        <input placeholder = "Նոր գին" />
                                    </div>
                                </div>
                                <div className = "admin-select-menu-discounts">
                                    <div className = "admin-discounts-area">
                                        <label class="container">
                                            <input type="checkbox"/>
                                            <span class="checkmark"></span>
                                        </label>
                                        <div className = "admin-select-menu-banner">
                                            <p>Բաններ</p>                                  
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                </div>
                                <div className = "admin-select-menu-sale">
                                    <label class="container">
                                        <input type="checkbox"/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       <div className="admin-product-button">
                            <button className="admin-product-buy-btn">
                                Ավելացնել
                            </button>
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


export default connect(mapstatetoprops, mapDispatchToProps)(AddProductModal)
