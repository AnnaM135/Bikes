import React, { Component } from 'react'
import "./list.css"
import "../filter/filter.css"
import Header from "../header/header"
import Footer from "../footer/Footer"
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
// import {changeCard} from "../../store/languages/action"
import {lang} from "../../lang"
import AdminServices from '../../services/AdminServices';


export class List extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             card: [],
             product: [],
             slideImg: [],
             sum: 0,
        }
    }
    
    componentDidMount(){
        AdminServices.getProductType(this.props.langData.langId, {productType:this.props.match.params.type})
        .then(r => {
           this.state.product = r.data.data
           this.setState({})
        })
        AdminServices.getProductsItem(this.props.match.params.item).then((r) => {
           this.state.data = r.data.data
           this.state.slideImg = this.state.data.imagePath 
            this.setState({})
        })
    }
    handelChangeLang = (id) =>{
        this.props.changeData(id)
        console.log(id)
    }

    addCard(item){
        let local = localStorage.getItem("item")
        let names;
        if(local === null){
            names = []
        }else{
            names = JSON.parse(local)
        }
        names.push(item)
        localStorage.setItem("item", JSON.stringify(names)) 
        let s = 0
        s += 1*item.price
        this.state.sum = s;

        this.setState({})
    }
   

    render() {
        return (
            <div className="product-page">
            <Header data = {this.state.card} handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
 <div className="product-page-area">
     <div className="product-img-area">
         <div className="product-slider">
             <div className="product-slider-img">
                 <div className = "slides">
                    <input type="radio" name="r" id="r1" checked />
					<input type="radio" name="r" id="r2" checked/>
					<input type="radio" name="r" id="r3" checked/>
					<input type="radio" name="r" id="r4" checked/>
                    {console.log(this.state.slideImg)}                 
                            <div class="slide s1">
                                  <div class="product-slider-img">
                                    <img src="/images/card-background.svg" className="product-slider-back-img" />
                                </div>                      
                            </div>               
                    <div class="slide">
						<h1>H2</h1> 
						<div class="product-slider-img">
                            <img src="/images/card-background.svg" className="product-slider-back-img" />
                            <img src={this.state.slideImg} className="product-bicycle-img" />
			            </div>
						
					</div>
                    <div class="slide">
						<h1>H3</h1> 
						<div class="product-slider-img">
                            <img src="/images/card-background.svg" className="product-slider-back-img" />
                            <img src="/images/bicycle.svg" className="product-bicycle-img" />
			            </div>
						
					</div>
                    <div class="slide">
						<h1>H4</h1> 
						<div class="product-slider-img">
                            <img src="/images/card-background.svg" className="product-slider-back-img" />
                            <img src="/images/bicycle.svg" className="product-bicycle-img" />
			            </div>
						
					</div>
                   
                 </div>
             </div>
             <div className="product-slide-label">
                 <div className="product-slide-navigate">
                     <label className="product-bar" htmlFor="r1"></label>
                     <label className="product-bar" htmlFor="r2"></label>
                     <label className="product-bar" htmlFor="r3"></label>
                     <label className="product-bar" htmlFor="r4"></label>
                 </div>
             </div>	
             <div className="about-product">
                 <h3>{this.state.data.productName}</h3>
                 <p>{this.state.data.description}</p>             
             </div>
         </div>
     </div>
     <div className="product-description-area">
         <div className="product-star">
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
         </div>
         <div className="product-code">
             <p>Կոդ 654236853</p>
             <h5>{this.state.data.productName}</h5>
         </div>
         <div className="product-price">
             <div className="product-price-now">
                {this.state.data.price} Դր
             </div>
             <div className="product-price-after">
                 <del>{this.state.data.oldPrice} Դր</del>
             </div>
         </div>
         <div className="product-discount">
             <p>12.000 դր / 24 ամիս</p>
         </div>
         <div className="select-color">
             <div className="price">
                 <p>Գույն</p>
             </div>	
             <div className="color-buttons">
             <div style = {{backgroundColor: "red"}}></div>
                                     <div style={{backgroundColor: `${this.state.data.colors}`}}></div>
                                     <div style={{backgroundColor: "silver"}}></div>
                                     <div style={{backgroundColor: "grey"}}></div>
                    <div style={{backgroundColor: "black"}}></div> 
             </div>
         </div>
         <hr />
         <div className="select-sale">
                 <div className="price">
                     <p>Չափ</p>
                     <p>15"</p>
                     <p className="fa fa-chevron-down" aria-hidden="true"></p>
                 </div>
                 
         </div>
         <hr />
             <div className="select-sale">
                 <div className="price">
                     <p>Հասակ</p>
                     <p className="fa fa-chevron-down" aria-hidden="true"></p>
                 </div>
                     <div className="sale-buttons">
                         <div>
                             <input type="checkbox" name="" />
                             <p>98-110</p>
                         </div>
                         <div>
                             <input type="checkbox" name="" />
                             <p>110-135</p>
                         </div>
                         <div>
                             <input type="checkbox" name="" />
                             <p>135-150</p>
                         </div>
                     </div>
             </div>
             <div className="product-buttons">
                 <button className="product-add-btn" onClick = {this.addCard.bind(this, this.state.data)}>ԱՎԵԼԱՑՆԵԼ</button>
                 <button className="product-buy-btn">ԳՆԵԼ</button>
             </div>
     </div>
 </div>
 <div className="same-product">
     <h1 className="same-product-title">Նմանատիպ ապրանքներ</h1>
      <div className="same-product-cards">
          {
              this.state.product.map((elem, i) => (
                <div key ={i} className="same-product-cards-one">
                    {JSON.parse(elem.imagePath).map((elem,i) => 
                    <div className="same-product-img">
                        <img src="/images/card-background.svg" />
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        <img src="/images/bicycle.svg" className="bicycle-img" />
                    </div>
                    )}
                     <div>
                 <div>
                     <p>Գույն</p>
                     <div className="color-buttons">
                         <div style = {{backgroundColor: `${elem.colors}`}}></div>
                     </div>
                 </div>
                 <div>{elem.productName}</div>
                 <div>{elem.description}</div>
                 <div className="price-add">
                     <p>{elem.price} Դր</p>
                     <button className="price-btn">Գնել</button>
                 </div>
                         
             </div>
                </div>
                

              ))
          }
            											
     </div> 
 </div>
 <Footer />
</div>

        )
    }
}


function mapstatetoprops(state){
    return{
        langData: state.langReducer,
        // basketReducer
    }
}
const mapDispatchToProps = {
     changeData,
    //  changeCard
}


export default connect(mapstatetoprops, mapDispatchToProps)(List)
