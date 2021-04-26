import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import "../../App.css"
import "../filter/filter.css"
import Footer from "../footer/Footer"
import Contact from '../contact/contact';
import Basket from '../basket/basket';
import { flags } from "../languages/data"
import classnames from "classnames";
import {lang} from "../../lang"
import AdminServices from '../../services/AdminServices';
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import ModalDelivery from "../Modal/ModalRules"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';


import SwiperCore, { Pagination} from 'swiper';
SwiperCore.use([ Pagination]);

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      types: [],
      showList: false,
      showMore: false,
      promo: [],
      sale: [],
      bestProducts: [], 
      search: "",
      searchProducts: [],
      showMenu: false,
      showStore: false,
      bestProductsSwiperActiveIdx:1,
    }
}
    componentDidMount() {
      console.log('componentDidMount homeeeee  ' + this.props.langData.langId);
      AdminServices.getProducts(this.props.langData.langId).then((r) => {
        this.state.data = r.data
        this.state.data.forEach(elem => {
          this.state.types.push(elem.productType)
          if(elem.promotions !== "") this.state.promo.push(elem.promotions)
          if(elem.discounts !== "") this.state.sale.push(elem)
          if(elem.theBestProduct) this.state.bestProducts.push(elem)
        })
        this.state.types = this.state.types.filter((c, index) => {
          return this.state.types.indexOf(c) === index;
      });
        this.setState({})
      })
      
        this.setState({
            active: flags[0].id,
        })
    }

  handelClick = (event) => {
      this.setState((prevState) => ({
          showList: !prevState.showList,
      }))
  }
  handelClickMenu = (event) => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }))
  }
   handelClickMore = (event) => {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }))
  }
  handelChangeLang = (id) =>{
    this.props.changeData(id)
    this.componentDidMount()
  }

  handelClickFlag = (event) => {
    const {id} = event.target.dataset;
    if(this.props.langData.langId !== id){
      this.handelChangeLang(id)
      this.setState({
        showList: false,
      })
      console.log(this.props.langData.langId);
      
    }
  }
  
  changeSearch(e){
    this.state.searchProducts = [];
    this.state[e.target.getAttribute("data-id")] = e.target.value;
    this.setState({})
    AdminServices.getProducts(this.props.langData.langId).then((r) => {
      const data = r.data.filter((elem)=> !elem.productName.search(this.state.search))
      if(this.state.search != ""){
        this.state.searchProducts = data
        this.setState({})
      }
    })
  }
  more(elem){
    let d  = elem.find(item => item == elem)
    console.log(d)
    this.setState({})
  }

  showMenu(){
    if(this.state.showStore === false){
        this.state.showStore = true;
    }
    else{
        this.state.showStore = false;
    }
    this.setState({})
}

    render() {
      const cnMenu = classnames({ "flag-list": true, "not-active": !this.state.showMenu,})
      const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList,})
      const cnMore = classnames({ "flag-list": true, "not-active": !this.state.showMore,})
      const currentFlag = flags.find((flag) => flag.id === this.props.langData.langId)
      if (!currentFlag) {
          return null
      }
        return (
            <div className = "home-body">
            <header className="header">
              <div className="header-line">
                <div className="wrapper">
                <div className="one header-card">
              <Link className="list-item-link" to="/">
                <img className = "logo" src = "/images/hecanivLogo.png" />
              </Link>
            </div>
            {/* <div className="one-menu header-card">
             
            </div> */}
                  <div className="two header-card">
                    <i className="fa fa-phone"></i>
                    <a className="phone" href="tel:+37444004405">+37444 004405</a>
                  </div>
                  <div className="three header-card">
                    <input type="text" id="header-input" data-id="search" value={this.state.search} onChange={this.changeSearch.bind(this)} placeholder={lang[this.props.langData.langId].search} />
                    <i className="fa fa-search"></i>
                    <div className = "search-context">
                        {
                            this.state.searchProducts.map((a) => (
                              <div key={a.id} >
                                <p>
                                  <Link style = {{color:"#FFFFFF"}} to={`/filter/${a.productType}/${a.productName}`}>
                                    {a.productName}
                                  </Link>
                                </p>
                              </div>
                            ))
                          }
                        </div>
                  </div>
                  <div className="four header-card">
                    <Link to = "/basket"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                  </div>
                  <div className="five header-card">
                    <div className="header-bus"> 
                        <ModalDelivery />
                     </div>
                    {/* {lang[this.props.langData.langId].} */}
                    <img src="./images/delivery-truck.png"/>
                  </div>
                  <div className="six header-card">
                    <button onClick={this.handelClick}>
                      <p className="label">{currentFlag.name}<i className="fa fa-chevron-down"></i></p>
                    </button>
                    <div className = "six-content">

                    <ul className = {cnUl} onClick={this.handelClickFlag}>
                      {
                        flags.map((flag) => {
                          if(flag.id === this.props.langData.langId){
                                return null
                            }
                          return (
                            <li key = {flag.id}>
                              <button data-id={flag.id} type="button">
                                <p data-id={flag.id}>{flag.name}</p>
                              </button>
                            </li>
                          )})
                      }
                    </ul>
                    </div>
                  </div>				
                </div>
              </div>
             
                      <div className = "nav">
                          <label className = "label-menu" htmlFor = "toggle">
                            <img src="../images/menu.svg" />
                          </label>
                          <input type = "checkbox" id = "toggle"/>
                         
                         <nav className = "new-menu">
          <ul className="header-menu-list">
            <li className="list-item">
              <Link to={`/filter/${this.state.types[0]}`} className="list-item-link">
                {lang[this.props.langData.langId].bicycle}
              </Link>
            </li>
            <li className="list-item">
              <Link to={`/filter/${this.state.types[1]}`} className="list-item-link">
                  {lang[this.props.langData.langId].carriage}
              </Link>
            </li>
            <li className="list-item">
              <Link to={`/filter/${this.state.types[2]}`} className="list-item-link">
                  {lang[this.props.langData.langId].tricycles}
              </Link>
            </li>

            <li className="list-item">
             <div className = "six"> 
                      
                        <button onClick={this.handelClickMore}>
                          <p className="list-item-link">{lang[this.props.langData.langId].more}<i className="fa fa-chevron-down"></i></p>
                        </button>
                        <div className = "six-content menu-types">
                            <ul className = {cnMore}>
                              {
                                this.state.types.slice(3).map((elem) => 
                                    <li key = {elem}  defaultValue={elem} >
                                      <a className = "list-item-link-black" href = "/basket"> {elem} </a>
                                    </li>

                                )
                              } 
                            </ul>
                        </div>
                      </div>
            </li>

            <li className="list-item">
              <Link to="/contact" className="list-item-link">{lang[this.props.langData.langId].contact}</Link>
            </li>
          </ul>
        </nav>
        </div>
                 
            </header>
            <div className="slogan-area">
              <h1 className="one-line">{lang[this.props.langData.langId].titleOne}</h1>
              <h1>{lang[this.props.langData.langId].titleTwo}</h1>
            </div>
            <div className="icon-down-area">
              <div className="icon-down">
                <a href = "#footer"><i className="fa fa-chevron-down"></i></a>
              </div>
            </div>

          <div className="best-offer">
              <h1 className="best-title">{lang[this.props.langData.langId].title}</h1>
                  {this.state.sale?.length > 0 && <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    pagination={{ clickable: true }} 
                    onSlideChange={(swiper) => this.setState({
                      bestProductsSwiperActiveIdx:swiper.realIndex
                    })}
                    loop={true}
                    onSwiper={(swiper) => console.log(swiper)}
                    centeredSlides={true}
                    initialSlide={1}
                    style={{
                      padding:'30px 20px'
                    }}
                  >
                    {this.state.bestProducts.map((product,idx) => <SwiperSlide>
                      <div className="discount-home-cards-one" style={{maxWidth:'initial',margin:0,border:"none"}}>
                      <div className="discount-home-img" style={{
                        transform: `scale(
                          ${this.state.bestProductsSwiperActiveIdx == idx ? 1 : 0.7}
                          )`,
                      }}>
                        <img src="./images/card-background.svg" />
                        {/* <i className="fa fa-shopping-cart"></i> */}
                        <img src="./images/bicycle.svg" className="bicycle-img" />
                      </div>
                        {this.state.bestProductsSwiperActiveIdx === idx && <div>
                          <div className = "card-context">
                            <div className="color-buttons">
                              <div style = {{backgroundColor: `${product.colors}`}}></div>
                              <div style = {{backgroundColor: "red"}}></div>
                              <div style = {{backgroundColor: "yellow"}}></div>
                              <div style = {{backgroundColor: "grey"}}></div>                             
                            </div>
                          <div>{product.productName}</div>
                          <div>{product.description}</div>
                          <div className="price-add">
                            <p>{product.price} Դր</p>
                            <button className="price-btn" ><a className = "buy-btn" href = "/basket">{lang[this.props.langData.langId].buy}</a></button>
                          </div>
                          </div>
                        </div>}
                      </div>
                    </SwiperSlide>
                    )}
                  </Swiper>    
    }
          </div>
    
            <div className="promotions">
              <h1 className="best-title">{lang[this.props.langData.langId].promotion}</h1>
              <div className="promotion-cards">
                {
                  this.state.promo.map(elem => (
                    <div className="promotions-card-one">
                      <img src="./images/img1.svg" />
                      <h1>{elem}</h1>
                    </div>    
                  ))
                }
                
                
              </div>
            </div>
            <div className="discount">
              <h1 className="best-title">{lang[this.props.langData.langId].discount}</h1>
              <div className="discount-cards">
                {
                  this.state.sale.map(elem => (
                  <div className="discount-home-cards-one">
                  <div className="discount-home-img">
                    <img src="./images/card-background.svg" />
                    {/* <i className="fa fa-shopping-cart"></i> */}
                    <img src="./images/bicycle.svg" className="bicycle-img" />
                  </div>
                    <div>
                      <div className = "card-context">
                      {/* <p>{elem.discounts}</p>
                        <p>{lang[this.props.langData.langId].color}</p> */}
                        <div className="color-buttons">
                          <div style = {{backgroundColor: `${elem.colors}`}}></div>
                          <div style = {{backgroundColor: "red"}}></div>
                          <div style = {{backgroundColor: "grey"}}></div>
                          <div style = {{backgroundColor: "black"}}></div>
                          
                        </div>
                      </div>
                      <div className = "card-context">

                    <div>{elem.productName}</div>
                    <div>{elem.description}</div>
                    <div className="price-add">
                      <p>{elem.price} Դր</p>
                      <button className="price-btn" ><a className = "buy-btn" href = "/basket">{lang[this.props.langData.langId].buy}</a></button>
                    </div>
                        
                    </div>
                  </div>
                      </div>

                  ))
                }
              			
              </div> 
            </div> 
    
            <Footer />
            
            {/* <Route path = "/filter" exact component = {Filter} /> */}
            <Route path = "/contact" component = {Contact} />
            <Route path = "/basket" component = {Basket} /> 
            
          </div>   
               
        )
    }
}

function mapstatetoprops(state){
  return{
      langData: state.langReducer
  }
}

// const mapStateToProps = function(state) {
//   console.log( 'State is ' + JSON.stringify(state))
//   return {
//     gg: state.langId,
   
//   }
// }

const mapDispatchToProps = {
   changeData
}

export default connect(mapstatetoprops, mapDispatchToProps)(Home)
