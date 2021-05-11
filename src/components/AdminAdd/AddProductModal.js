import React, { Component } from 'react'
import {Modal} from "react-bootstrap"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import Header from "../header/header"
import "../AdminPanel/AdminPanel.css"
import classnames from "classnames";
import { Children } from 'react'
import axios from "../AxiosPost/AxiosPost";




class AddProductModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false,
             showMenu: false,
             menu: [
                 "Հեծանիվներ", "saylak", "tonacar"
             ],
             product: {
                    productNameHY:'',
                    productNameRU:'',
                    productNameEN:'',
                    productType:'',
                    price:'',
                    oldPrice:'',
                    colors:'',
                    sizes:'',
                    descriptionRU:'',
                    descriptionEN:'',
                    descriptionHY:'',
                    promotions: false,
                    discounts: false,
                    codeOfProduct: '',
                    theBestProduct: false,
                    height:'',
                    banner: '',
                    hashtag:'',
                    imagePath: ""
            },              
        }
    }
    getProducts = async () => {
        const { data } = await axios.get(`/product/products`)
        console.log(data)
    }
    componentDidMount() {
        this.getProducts()
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
      handleChange = (e) => {
          if(e.target.type == "file"){
            this.state.product[e.target.getAttribute("id")] = e.target.files;
          }
        if(e.target.type === 'checkbox'){
            this.state.product[e.target.getAttribute("data-id")] = e.target.checked;           
        }
        else{
            this.state.product[e.target.getAttribute("data-id")] = e.target.value;
        }
        this.setState({  })
      }

      add = async () => {
        let formData = new FormData()
        for(let i of Object.keys(this.state.product)){
            formData.append("data", JSON.stringify(this.state.product[i]))         
        }
        //     for(let i of Object.keys(this.state.inp.photos)){
        //         formData.append("photo_url", this.state.inp.photos[i])
        //     }
        //   await axios.post('/product/add', this.state.product)   
          console.log(formData)   
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
                            <label htmlFor = "imagePath">
                                <img src = "./images/addPhoto.svg" width = "200px" />                           
                            </label>
                            <input  type='file' multiple id = "imagePath" onChange = {this.handleChange}/>
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
                                    <p>Կոդ</p>
                                    <p>Արժեք</p>
                                    <p>Զեղչ</p>
                                    <p>Ակցիա</p>
                                    <p>Լավագույն առաջարկ</p>
                                </div>
                            </div>
                            <div className = "admin-add-right">
                                <div onClick={this.handelClickMenu} className = "admin-select-menu-types">
                                    <div className = "dropdown-menu-admin">
                                         <select data-id = "productType"  onChange = {this.handleChange}>
                                            <option >Հեծանիվներ</option>
                                            <option >Սայլակներ</option>
                                            <option >Տոնածառներ</option>
                                            <option >Սքեյթ</option>
                                        </select>
                                    </div>
                                   <i style = {{cursor: "pointer"}} class="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                                <div>
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Հայերեն" data-id = "productNameHY" onChange = {this.handleChange} value = {this.state.productNameHY}/>
                                        <input placeholder = "Ռուսերեն" data-id = "productNameRU" onChange = {this.handleChange} value = {this.state.productNameRU}/>
                                        <input placeholder = "Անգլերեն" data-id = "productNameEN" onChange = {this.handleChange} value = {this.state.productNameEN}/>
                                    </div>

                                </div>
                                <div >
                                    <div className = "admin-add-product-color">
                                            <input type="color" value="#B42F32" data-id = "colors" onChange = {this.handleChange}/>
                                        
                                            <input type="color" value="#E8A631" data-id = "colors" onChange = {this.handleChange}/>
                                        
                                            <input type="color" value="#E3E3CD" data-id = "colors" onChange = {this.handleChange}/>
                                        
                                            <input type="color" value="#878D92" data-id = "colors" onChange = {this.handleChange}/>
                                        
                                            <input type="color" value="#49494D" data-id = "colors" onChange = {this.handleChange}/>
                                        <a>Ավելին</a>
                                    </div>
                                </div>
                                <div className = "admin-select-menu-types">
                                    <select data-id = "sizes"  onChange = {this.handleChange}>
                                        <option >16</option>
                                        <option >24</option>
                                        <option >25</option>
                                        <option >23</option>
                                    </select>
                                   <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                                <div className = "admin-select-menu-types">
                                         <select data-id = "height"  onChange = {this.handleChange}>
                                            <option >110-120</option>
                                            <option >80-90</option>
                                            <option >60-70</option>
                                            <option >20-30</option>
                                        </select>
                                   <i class="fa fa-angle-down" aria-hidden="true"></i>
                                </div>
                                <div >
                                    <div className = "admin-add-product-name">
                                    <input placeholder = "Հայերեն" data-id = "descriptionHY" onChange = {this.handleChange} value = {this.state.descriptionHY}/>
                                        <input placeholder = "Ռուսերեն" data-id = "descriptionRU" onChange = {this.handleChange} value = {this.state.descriptionRU}/>
                                        <input placeholder = "Անգլերեն" data-id = "descriptionEN" onChange = {this.handleChange} value = {this.state.descriptionEN}/>
                                    </div>
                                </div>
                                <div className = "admin-select-menu-price">
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Ապրանքի կոդ" data-id = "codeOfProduct" onChange = {this.handleChange} value = {this.state.codeOfProduct}/>
                                        <input placeholder = "Հաշթեգ" data-id = "hashtag" onChange = {this.handleChange} value = {this.state.hashtag}/>
                                    </div>
                                </div>
                                <div className = "admin-select-menu-price">
                                    <div className = "admin-add-product-name">
                                        <input placeholder = "Հին գին" data-id = "oldPrice" onChange = {this.handleChange} value = {this.state.oldPrice}/>
                                        <input placeholder = "Նոր գին" data-id = "price" onChange = {this.handleChange} value = {this.state.price}/>
                                    </div>
                                </div>
                                <div className = "admin-select-menu-sale">
                                    <label class="container">
                                        <input type="checkbox" data-id = "promotions" onChange = {this.handleChange} defaultChecked={!!this.state.promotions}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div> 
                                <div className = "admin-select-menu-discounts">
                                    <div className = "admin-discounts-area">
                                        <label class="container">
                                            <input type="checkbox" data-id='discounts' onChange = {this.handleChange} defaultChecked={!!this.state.discounts}/>
                                            <span class="checkmark"></span>
                                        </label>
                                        <div className = "admin-select-menu-banner">
                                            <select data-id = "banner"  onChange = {this.handleChange}>
                                                <option >Բաններ_1</option>
                                                <option >Բաններ_2</option>                                               
                                            </select>
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                </div>
                                <div className = "admin-select-menu-sale">
                                    <label class="container">
                                        <input type="checkbox" data-id='theBestProduct' onChange = {this.handleChange} defaultChecked={!!this.state.theBestProduct}/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                       </div>
                       <div className="admin-product-button">
                            <button className="admin-product-buy-btn" onClick = {this.add}>
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
