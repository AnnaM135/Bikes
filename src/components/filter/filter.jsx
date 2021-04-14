import React, { Component } from 'react'
import Header from "../header/header"
import Footer from "../footer/Footer"
import "./filter.css"
import { Link } from 'react-router-dom';
import List from "../list/list"
import "../../App.css"
import AdminServices from '../../services/AdminServices';
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"
import classnames from "classnames";



export class Filter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             pages: [],
             product: [],
             currentPage: 1,
             startIndex: 0,
             showList: false,
             types: [],
             show: [],
             filterInp: {
                prodType: "",
                price: "",
                colors: "",
                discounts: "",
                size: "",
                height: "",
             },
        }
    }
    
     componentDidMount(){
        AdminServices.getProducts(this.props.langData.langId).then((r) => {
           
            
            // this.state.data.forEach(elem => (
            //     this.state.types.push(elem.productType)
            // ))
            // this.state.types = this.state.types.filter((c, index) => {
            //     return this.state.types.indexOf(c) === index;
            // });
            this.setState({})
            AdminServices.getProductType(this.props.langData.langId, {productType:this.props.match.params.type})
            .then(r => {
               this.state.product = r.data.data

               this.state.show = this.state.product.slice(this.state.startIndex, this.state.startIndex + 9)
               let n = Math.ceil(this.state.product.length/9)
               for(let i = 1; i<=n; i++){
                   this.state.pages.push(i)
               }
               
               this.setState({})
            })   
            this.setState({})
        })
       
    }
    handelClick = (event) => {
        this.setState((prevState) => ({
            showList: !prevState.showList,
        }))
    }
    handelChangeLang = (id) =>{
        this.props.changeData(id)
    }
    change(e) {
        console.log(e.target.checked, e.target.value)
       this.state.filterInp[e.target.name] = [e.target.value] 
       console.log(this.state.filterInp.discounts)
      
        this.setState({});
      }
      filter(){
        AdminServices.getProducts(this.props.langData.langId).then(r => {
            this.state.data = r.data
            let arr = []
            for (let key in this.state.filterInp) {
                if(!key){
                    this.state.data = this.state.data.filter((a) => a[key] !== this.state.filterInp[key]) 
                }
                console.log(this.state.data)
            }
            this.setState({})

            // this.state.data.forEach(elem =>{
            //     // this.state.filterInp.size = elem.size
            //     // this.state.filterInp.height = elem.height
            //     this.state.filterInp.discounts = elem.discounts
            //    // console.log(this.state.filterInp)
            // })
        })
      }
    openPage(x){
        this.state.currentPage = x
        this.state.startIndex = (x-1) * 9 
        this.state.show = this.state.product.slice(this.state.startIndex, this.state.startIndex + 9)
        this.setState({})
    }
    prev(){
        this.state.currentPage--
        this.state.startIndex = (this.state.currentPage-1)*9
        this.setState({})
    }
    next(){
        this.state.currentPage++
        this.state.startIndex = (this.state.currentPage-1)*9
        this.setState({})
    }
    render() {
        const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList, })
        return (
            <div className="assortment-col">
            <Header  handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
                <div className="assortment-row">
                    <div className="assortment-col-one">
                        <div className="filter-head head-end">
                            <Link to = "/"><p className="fa fa-long-arrow-left"></p></Link>
                            <p>Գլխավոր</p>
                        </div>	
                    
                        <div className="filter">
                        <div>                                          
                            <div className="filter-title">Ֆիլտր {lang[this.props.langData.langId].color}</div>
                            <div className="select">
                                <div className="select-center">
                                    <button onClick={this.handelClick}>
                                        <p className="label">Տեսակ<i className="fa fa-chevron-down"></i></p>
                                    </button>
                                    <ul className = {cnUl}>
                                          {
                                            this.state.types.map(a => {
                                                return (
                                                    <li key = {a}>
                                                      <button  type="button">
                                                        <p>{a}</p>
                                                      </button>
                                                    </li>
                                                  )
                                                })
                                        }                                   
                                    </ul>
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>

                                </div>						
                            </div>
                            <hr />
                            <div className="select-proce">
                                <div className="price">
                                    <p>Գինը</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>	
                                <div className="type-price">					
                                    <p>Սկսած</p>
                                    <div className="before">
                                        <input type="" name="" placeholder="0" />
                                    </div>
                                    <p>Մինչև</p>
                                    <div className="after">
                                        <input type="" name="" placeholder="1260" />
                                    </div>
                                </div>	
                                <div className="select-range">
                                    <div className="rangeslider">
                                        <input className="min" name="range_1" type="range" min="1" max="100" value="10" />
                                        <input className="max" name="range_1" type="range" min="1" max="100" value="90" />
                                        <span className="range_min light left">10.000 €</span>
                                        <span className="range_max light right">90.000 €</span>
                                    </div>
                                </div>
                            </div>					
                            <hr />
                            <div className="select-color">
                                <div className="price">
                                    <p>Գույն</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>	
                                <div className="color-buttons">
                                    <div style = {{backgroundColor: "red"}}></div>
                                    <div style={{backgroundColor: "yellow"}}></div>
                                    <div style={{backgroundColor: "silver"}}></div>
                                    <div style={{backgroundColor: "grey"}}></div>
                                    <div style={{backgroundColor: "black"}}></div> 
                                </div>
                            </div>
                            <hr />
                            <div className="select-sale">
                                <div className="price">
                                    <p>Զեղչ</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>
                                    <div className="sale-buttons">
                                        <div>
                                            <input type="radio" id="male" name="discounts" value={this.state.filterInp.discounts}  onChange={this.change.bind(this)}/>
                                            <label for="male">20%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="female" name="discounts" value="female" onChange={this.change.bind(this)}/>
                                            <label for="female">25%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="other" name="discounts" value="other" onChange={this.change.bind(this)}/>
                                            <label for="other">60%</label>
                                        </div>                                        
                                        

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
                                            <input type="radio" id="height1" name="height" value="height1" onChange={this.change.bind(this)} />
                                            <label for="height1">20%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="heghit2" name="height" value="heghit2" onChange={this.change.bind(this)}/>
                                            <label for="heghit2">25%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="height3" name="height" value="height3" onChange={this.change.bind(this)}/>
                                            <label for="height3">60%</label>
                                        </div>  
                                    </div>
                            </div>
                            <hr />
                            <div className="select-sale">
                                <div className="price">
                                    <p>Չափ</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>
                                    <div className="sale-buttons">
                                        <div>
                                            <input type="radio" id="size1" name="size" value="size1" onChange={this.change.bind(this)}/>
                                            <label for="size1">20%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="size2" name="size" value="size2" onChange={this.change.bind(this)} />
                                            <label for="size2">25%</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="size3" name="size" value="size3" onChange={this.change.bind(this)}/>
                                            <label for="size3">60%</label>
                                        </div>  
                                    </div>
                            </div>

                            <div className="select">
                                <div className="select-btn">
                                    <button onClick = {this.filter.bind(this)}>Կիրառել</button>
                                </div>	
                            </div>
                            <div className="select-update">
                                <a href="">Թարմացնել</a>
                            </div>    
                                        </div>
                         
                        </div>	
                        <div className="assortment-col-three">	
                            <div className="our-pluses">
                                <img src="/images/filter-bike.svg" />
                                <p>Ցածր գներ</p>
                                <p>Մեծ տեսականի</p>
                                <p>Արագ առաքում</p>
                                <p>Հարմարավետ սպասարկում</p>
                            </div>
                            <div className="our-pluses-icon">
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>
                        </div>		
                    </div>
                    <div className="assortment-col-two">
                        <div className="filter-head">
                            <p className="fa fa-bicycle filter-icon-bike" aria-hidden="true"></p>
                            <p className="filter-head-bike">{this.props.match.params.type}</p>
                        </div>	
                        <div className="assortment-area-cards">
                           {
                               this.state.show.map((elem, i) => (
                                   
                                    <div key ={i} className="discount-cards-one">    
                                        {JSON.parse(elem.imagePath).map((elem,i) => 
                                            <div className="discount-img">
                                                <img src="/images/card-background.svg" />
                                                <Link to = "/basket"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                                                <img src="/images/bicycle.svg" className="bicycle-img" />
                                                {/* <img src={elem} className="bicycle-img" /> */}
                                            </div>
                                        )}             
                                       
                                        <div>
                                            <div>
                                                <Link to = {`/filter/${elem.productType}/${elem.productName}`}>
                                                <p>Գույն</p> </Link>
                                                <div className="color-buttons">
                                                    <div style = {{backgroundColor: `${elem.colors}`}}></div>
                                                    <div style={{backgroundColor: "yellow"}}></div>
                                                    <div style={{backgroundColor: "silver"}}></div>
                                                    <div style={{backgroundColor: "grey"}}></div>
                                                    <div style={{backgroundColor: "black"}}></div> 
                                                </div>
                                            </div>
                                            <div>{elem.productType}</div>
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
                        <div className="pagination">
                            <i class="fa fa-chevron-left" aria-hidden="true" onClick = {this.prev.bind(this)}></i>
                            <ul>
                               {
                                   this.state.pages.map((a, b) =>{
                                       return(
                                           <li key = {b} onClick={this.openPage.bind(this, a)} >
                                             {a}
                                           </li>
                                       )
                                   })
                               }
                            </ul>
                            <i class="fa fa-chevron-right" aria-hidden="true" onClick = {this.next.bind(this)}></i>
                        </div>
                    </div>
                </div>
<Footer />

</div>
        )
    }
}

function mapstatetoprops(state){
    return{
        langData: state.langReducer
    }
}
const mapDispatchToProps = {
     changeData
}

export default connect(mapstatetoprops, mapDispatchToProps)(Filter)
