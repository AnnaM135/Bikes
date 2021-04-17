import React, { Component } from 'react'
import Header from "../header/header"
import Footer from "../footer/Footer"
import "./filter.css"
import { Link } from 'react-router-dom';
import "../../App.css"
import AdminServices from '../../services/AdminServices';
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"
import classnames from "classnames";
import { getAllFilters } from '../../services/FilterUtils';
import ProductItem from '../productItem/ProductItem';



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
             show: [],
             filterValues : {
                colors: [],
                types: [],
                discounts: [],
                sizes: [],
                heights: []
        
            },
             filterInp: {
                prodType: "",
                minPrice: "60000",
                maxPrice: "65000",
                colors: "",
                discounts: "",
                size: "",
                height: "",
             },
        }
    }
    

    


     componentDidMount(){
        AdminServices.getProducts(this.props.langData.langId).then((r) => {
            this.state.filterTypes = r.data
  
            //this.state.filterValues = getAllFilters(r.data);
            this.setState({
                filterValues :  getAllFilters(r.data)
            });
            
     
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
        if(( e.target.name === 'minPrice' || e.target.name === 'maxPrice') && isNaN(+e.target.value)){
            return 
        }
        this.state.filterInp[e.target.name] = e.target.value 
        this.setState({});
    }
    filter(){

        console.log("TETTTTTTTTTTTTTTt");
        console.log(this.state.filterInp);


        // AdminServices.getProducts(this.props.langData.langId).then(r => {
        //     const { data } = r;
        //     const { colors, minPrice, maxPrice, prodType, discounts, size, height } = this.state.filterInp
        //     let arr = [...data]
            
        //     console.log(JSON.stringify(this.state.filterInp));
         
        //     this.setState({})
        // })

    }
    setTypes(a){
        this.state.filterInp.prodType = a
        this.setState({})
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
    changeColor(a) {
        this.state.filterInp.colors = a
this.setState({})
        // const elem = this.state.filterInp.colors.find(elem => elem === a)
        // if(elem) {
        //     this.state.filterInp.colors = this.state.filterInp.colors.filter(elem => elem !== a)
        //     this.setState({})
        //     return 
        // }
        // this.state.filterInp.colors = [...this.state.filterInp.colors, a]
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
                                            this.state.filterValues.types.map(a => {
                                                return (
                                                    <li key = {a}>
                                                      <button onClick={this.setTypes.bind(this, a)} type="button">
                                                        <p>{a}</p>
                                                      </button>
                                                    </li>
                                                  )
                                                })
                                        }                                   
                                    </ul>
                                    
                                    {/* <i className="fa fa-chevron-down" aria-hidden="true"></i> */}

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
                                        <input type="text" name="minPrice" placeholder="0" value = {this.state.filterInp.minPrice} onChange = {this.change.bind(this)} />
                                    </div>
                                    <p>Մինչև</p>
                                    <div className="after">
                                        <input type="text" name="maxPrice" placeholder="1260" value = {this.state.filterInp.maxPrice} onChange = {this.change.bind(this)}/>
                                    </div>
                                </div>	
                                {/* <div className="select-range">
                                    <div className="rangeslider">
                                        <input className="min" name="range_1" type="range" min="1" max="100" value="10" />
                                        <input className="max" name="range_1" type="range" min="1" max="100" value="90" />
                                        <span className="range_min light left">10.000 €</span>
                                        <span className="range_max light right">90.000 €</span>
                                    </div>
                                </div> */}
                            </div>					
                            <hr />
                            <div className="select-color">
                                <div className="price">
                                    <p>Գույն</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>	
                                <div className="color-buttons">
                                    {
                                        this.state.filterValues.colors.map(a => {
                                            return(
                                                <div onClick = {this.changeColor.bind(this, a)} style = {{backgroundColor: `${a}`}}></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="select-sale">
                                <div className="price">
                                    <p>Զեղչ</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>
                                    <div className="sale-buttons">
                                        {
                                            this.state.filterValues.discounts.map(a => {
                                                return(
                                                    <div key = {a}>
                                                        <input type="radio" id="male" name="discounts" value={a}  onChange={this.change.bind(this)}/>
                                                        <label for="male">{a}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            </div>
                            <hr />
                            <div className="select-sale">
                                <div className="price">
                                    <p>Հասակ</p>
                                    <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                </div>
                                    <div className="sale-buttons">
                                       
                                        {
                                            this.state.filterValues.heights.map(a => {
                                                return (
                                            <div key = {a}>
                                                <input type="radio" id="height1" name="height" value={a} onChange={this.change.bind(this)} />
                                                <label for="height1">{a}</label>
                                            </div>
                                                )
                                            })
                                        }
                                    </div>
                            </div>
                            <hr />
                            <div className="select-sale">
                                    <div className="price">
                                        <p>Չափ</p>
                                        <p className="fa fa-chevron-down" aria-hidden="true"></p>
                                    </div>
                                        
                                    <div className="sale-buttons">
                                        {
                                            this.state.filterValues.sizes.map(a => {
                                                return(
                                                    <div key = {a}>
                                                        <input type="radio" id="size1" name="size" value="size1" value = {a} onChange={this.change.bind(this)}/>
                                                        <label for="size1">{a}</label>
                                                    </div>
                                                )
                                            })
                                        }
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
                               this.state.show.map((cur, i) => (
                                   
                                <ProductItem elem={cur} />
                                  
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
