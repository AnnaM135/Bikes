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
      searchProducts: []
    }
}
    componentDidMount() {
      AdminServices.getProducts(this.props.langData.langId).then((r) => {
        this.state.data = r.data
        this.state.data.forEach(elem => (
         this.state.types.push(elem.productType),
         elem.promotions !== "" ?  this.state.promo.push(elem.promotions)  : null,
         elem.discounts !== "" ? this.state.sale.push(elem)  : null,
         elem.theBestProduct !== false ? this.state.bestProducts.push(elem) : null
        ))
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
      const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList, })
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
                  <div className="two header-card">
                    <i className="fa fa-phone"></i>
                    <a className="phone" href="tel">+374 444444</a>
                  </div>
                  <div className="three header-card">
                    <input type="text" id="header-input" data-id="search" value={this.state.search} onChange={this.changeSearch.bind(this)} placeholder="search peoples" />
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
              <nav className="nav-bar">
              <ul className="header-menu-list">
                {
                  this.state.types.map((elem, i) => (
                    <li key = {i} className="list-item">
                      {console.log(elem)}
                      <Link to = {`/filter/${elem}`} className="list-item-link">
                          {elem}
                      </Link>
                    </li>
                  ))
                }
                {/* <Link to = {`/filter/${this.state.hy[0]}`} className="list-item-link">{this.state.hy[0]}</Link> */}
                
                <li className="list-item">
                <Link>
                  <select name="cars" id="cars">
                    <option value="volvo">Ավելին</option>
                    <option value="saab">sjkg</option>
                    <option value="opel">sfn</option>
                    <option value="audi">sdgnk</option>
                  </select></Link>
                </li>
                <li className="list-item">
                  <Link to = "/contact" className="list-item-link">Կոնտակներ</Link>
                </li>
              </ul>
            </nav>
            </header>
            <div className="slogan-area">
              <h1 className="one-line">ԼԱՎԱԳՈՒՅՆ ՆՎԵՐԸ </h1>
              <h1>ԱԿՏԻՎ ԿՅԱՆՔԸ ՍԻՐՈՂՆԵՐԻՆ</h1>
            </div>
            <div className="icon-down-area">
              <div className="icon-down">
                <a href = "#footer"><i className="fa fa-chevron-down"></i></a>
              </div>
    
              {/* <div className="slide-label">
                <div className="slide-navigate">
                  <label className="bar"></label>
                  <label className="bar"></label>
                  <label className="bar"></label>
                </div>
              </div>	 */}
            </div>
            <div className="best-offer">
              <h1 className="best-title">Լավագույն Առաջարկներ</h1>
              <div className="slider middle">
                {/* <div className="best-slide-buttons  bast-cards">
                  <i className="fa fa-chevron-left"></i>
                </div> */}
                <div className = "slides">
                  <input type="radio" name="r" id="r1"  checked/>
                  <input type="radio" name="r" id="r2" checked/>
                  <input type="radio" name="r" id="r3" checked/>

                  <div className = "slide s1">
                    {
                      this.state.bestProducts.map((elem, i) => (
                        <div key = {i} className="best-slide-cards bast-cards">
                          <div className="slide-card-left">{elem.productName}</div>
                          <div className="slide-card-center">2</div>
                          <div className="slide-card-right">3</div>
                       </div>
                      ))
                    }
                   
                  </div>
                  <div className = "slide">
                    <div className="best-slide-cards bast-cards">
                      <div className="slide-card-left">1</div>
                      <div className="slide-card-center">2</div>
                      <div className="slide-card-right">3</div>
                    </div>
                  </div>
                  <div className = "slide">
                    <div className="best-slide-cards bast-cards">
                      <div className="slide-card-left">1</div>
                      <div className="slide-card-center">2</div>
                      <div className="slide-card-right">3</div>
                    </div>
                  </div>
                 
                </div>
                {/* <div className="best-slide-buttons bast-cards">
                  <i className="fa fa-chevron-right"></i>
                </div> */}
                
                <div className="slide-label">
                  <div className="slide-navigate">
                    <label for="r1" className="bar"></label>
                    <label for="r2" className="bar"></label>
                    <label for="r3" className="bar"></label>
                  </div>
              </div>
              </div>
              
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
                
                {/* <div className="promotions-card-two">
                  <img src="./images/img2.svg" />
                </div> */}
              </div>
            </div>
            <div className="discount">
              <h1 className="best-title">Զեղչեր</h1>
              <div className="discount-cards">
                {
                  this.state.sale.map(elem => (
                  <div className="discount-home-cards-one">
                    {console.log(elem)}
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
