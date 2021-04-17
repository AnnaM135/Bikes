import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import "../../App.css"
import "../filter/filter.css"
import Filter from "../filter/filter"
import Footer from "../footer/Footer"
import Contact from '../contact/contact';
import Basket from '../basket/basket';
import { flags } from "../languages/data"
import classnames from "classnames";
import {lang} from "../../lang"
import AdminServices from '../../services/AdminServices';
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"


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
      promo: [],
      sale: [],
      bestProducts: [], 
      search: "",
      searchProducts: [],
      showMenu: true,
      bestProductsSwiperActiveIdx:1,
    }
}
    componentDidMount() {
      console.log(this.state.bestProducts)
      AdminServices.getProducts(this.props.langData.langId).then((r) => {
        this.state.data = r.data
        
        this.state.data.forEach(elem => {
          this.state.types.push(elem.productType)
          if(elem.promotions !== "") this.state.promo.push(elem.promotions)
          if(elem.discounts !== "") this.state.sale.push(elem)
          if(elem.theBestProduct) this.state.bestProducts.push(elem)
        })

        // this.state.data.forEach(elem => (
        //  this.state.types.push(elem.productType),
        //  elem.promotions !== "" ?  this.state.promo.push(elem.promotions)  : null,
        //  elem.discounts !== "" ? this.state.sale.push(elem)  : null,
        //  elem.theBestProduct !== false ? this.state.bestProducts.push(elem) : null
        // ))

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
  handelChangeLang = (id) =>{
    this.props.changeData(id)
  }
  handelClickFlag = (event) => {
    const {id} = event.target.dataset;
    if(this.props.langData.langId !== id){
    this.handelChangeLang(id)
      this.setState({
          showList: false,
      })
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

    render() {
      const cnMenu = classnames({ "nav-bar": true, "not-active": !this.state.showMenu,})
      const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList,})
      const currentFlag = flags.find((flag) => flag.id === this.props.langData.langId)
      if (!currentFlag) {
          return null
      }
        return (
            <div className = "home-body">
            <header className="header">
              <div className="header-line">
                <div className="wrapper">
                  <div className="one header-card">LOGOBIKE</div>
                  <div className = "one-menu header-card">
                    <img src = "./images/menu.svg" onClick = {this.handelClickMenu}/>
                  </div>
                  <div className="two header-card">
                    <i className="fa fa-phone"></i>
                    <a className="phone" href="tel">+374 444444</a>
                  </div>
                  <div className="three header-card">
                    <input type="text" id="header-input" data-id="search" value={this.state.search} onChange={this.changeSearch.bind(this)} placeholder="Search" />
                    <i className="fa fa-search"></i>
                    {
                      this.state.searchProducts.map((a) => (
                        <div key = {a.id}>
                          <p>
                            <Link to = {`/filter/${a.productType}/${a.productName}`}>
                              {a.productName}
                            </Link>
                          </p>
                        </div>
                      ))
                    }
                  </div>
                  <div className="four header-card">
                    <Link to = "/basket"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                  </div>
                  <div className="five header-card">
                    <div className="header-bus"> 24 ժամյա առաքում </div>
                    {/* {lang[this.props.langData.langId].color} */}
                    <img src="./images/delivery-truck.png"/>
                  </div>
                  <div className="six header-card">
                    <button onClick={this.handelClick}>
                      <p className="label">{currentFlag.name}<i className="fa fa-chevron-down"></i></p>
                    </button>
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
              {
                this.state.showMenu ?
                    <nav  style={{display:'flex'}} className="nav-bar">
                    <ul className="header-menu-list">
                    <li className="list-item">
                            <Link to = {`/filter/${this.state.types[0]}`} className="list-item-link">
                                {this.state.types[0]}
                            </Link>
                            </li>
                            <li  className="list-item">
                            <Link to = {`/filter/${this.state.types[1]}`} className="list-item-link">
                                {this.state.types[1]}
                            </Link>
                            </li>
                            <li className="list-item">
                            <Link to = {`/filter/${this.state.types[2]}`} className="list-item-link">
                                {this.state.types[2]}
                            </Link>
                            </li>
                      
                      <li className="list-item">
                        <select className = "select-more">
                            <option value="" selected disabled hidden>Ավելին</option>
                          {
                            this.state.types.slice(3).map((elem) => 
                               <option value={elem} >{elem}</option>

                            )
                          }                          
                        </select>
                      </li>
                     
                      <li className="list-item">
                        <Link to = "/contact" className="list-item-link">Կոնտակներ</Link>
                      </li>
                    </ul>
                  </nav>
                :null
              }
             
            </header>
            <div className="slogan-area">
              <h1 className="one-line">ԼԱՎԱԳՈՒՅՆ ՆՎԵՐԸ </h1>
              <h1>ԱԿՏԻՎ ԿՅԱՆՔԸ ՍԻՐՈՂՆԵՐԻՆ</h1>
            </div>
            <div className="icon-down-area">
              <div className="icon-down">
                <a href = "#footer"><i className="fa fa-chevron-down"></i></a>
              </div>
            </div>

          <div className="best-offer">
              <h1 className="best-title">Լավագույն Առաջարկներ</h1>
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
                        <i className="fa fa-shopping-cart"></i>
                        <img src="./images/bicycle.svg" className="bicycle-img" />
                      </div>
                        {this.state.bestProductsSwiperActiveIdx === idx && <div>
                          <div>
                            <p>{product.discounts}</p>
                            <p>Գույն</p>
                            <div className="color-buttons">
                              <div style = {{backgroundColor: `${product.colors}`}}></div>
                            </div>
                          </div>
                          <div>{product.productName}</div>
                          <div>{product.description}</div>
                          <div className="price-add">
                            <p>{product.price} Դր</p>
                            <button className="price-btn">Գնել</button>
                          </div>
                        </div>}
                      </div>
                    </SwiperSlide>
                    )}
                  </Swiper>    
    }
          </div>
    
            <div className="promotions">
              <h1 className="best-title">Ակցիաներ</h1>
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
              <h1 className="best-title">Զեղչեր</h1>
              <div className="discount-cards">
                {
                  this.state.sale.map(elem => (
                  <div className="discount-home-cards-one">
                  <div className="discount-home-img">
                    <img src="./images/card-background.svg" />
                    <i className="fa fa-shopping-cart"></i>
                    <img src="./images/bicycle.svg" className="bicycle-img" />
                  </div>
                    <div>
                      <div>
                      <p>{elem.discounts}</p>
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
const mapDispatchToProps = {
   changeData
}

export default connect(mapstatetoprops, mapDispatchToProps)(Home)
