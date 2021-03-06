import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import classnames from "classnames";
import { flags } from "../languages/data";
import AdminServices from '../../services/AdminServices';
import { getAllFilters } from '../../services/FilterOptionUtils';
import { lang } from "../../lang"
import ModalDelivery from '../Modal/ModalRules';




export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      types: [],
      showList: false,
      search: "",
      searchProducts: [],
      basketCount: 0

    }
  }
  componentDidMount() {
    // let item = JSON.parse(localStorage.getItem("item"))
    // this.setState({
    //   basketCount: item.length
    // })
    // console.log("poxvum e" + item.length)
    // console.log("poxvum e" + this.state.basketCount)
    AdminServices.getProducts().then(r => {
      let filtObj = getAllFilters(r.data);

      this.setState({ types: filtObj.types })

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
  changeSearch(e) {
    this.state.searchProducts = [];
    this.state[e.target.getAttribute("data-id")] = e.target.value;
    this.setState({})
    console.log(this.state.search)
    AdminServices.search(this.state.search).then((r) => {
        // const data = r.data.data.filter((elem) => !elem.productName.search(this.state.search))
        
      if (this.state.search != "") {
        this.state.searchProducts = r.data.data
        console.log(this.state.searchProducts)
        this.setState({})
      }
    })
    // AdminServices.getProducts(this.props.langId).then((r) => {
    //   const data = r.data.filter((elem) => !elem.productName.search(this.state.search))
    //   if (this.state.search != "") {
    //     this.state.searchProducts = data
    //     this.setState({})
    //   }
    // })
  }

  handelClickFlag = (event) => {
    const { id } = event.target.dataset;
    if (this.props.langId !== id) {
      this.props.handelChangeLang(id)
      this.setState({
        showList: false,
      })
      console.log(this.props.langId, id)
    }
  }
    handelClickMore = (event) => {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }))
  }
  render() {
    const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList, })
    const currentFlag = flags.find((flag) => flag.id === this.props.langId)
    const cnMore = classnames({ "flag-list-more": true, "not-active": !this.state.showMore,})
    if (!currentFlag) {
      return null
    }
    return (
      <header className="header header-black">
        <div className="header-line">
          <div className="wrapper">
          <div className="one header-card">
                <Link className="list-item-link" to="/">
                  <img className = "logo" src = "/images/hecanivLogo.png" />
              </Link>
            </div>
            <div className="one-menu header-card">
          
            </div>
            <div className="two header-card">
              <i className="fa fa-phone" ></i>
              <a className="phone" href="tel:+37444004405" >+37444 004405</a>
            </div>
           <div className="three header-card">
              <input type="text" id="header-input" data-id="search" value={this.state.search} onChange={this.changeSearch.bind(this)} placeholder={lang[this.props.langId].search} />
              <i className="fa fa-search"></i>
             <div className = "large-2" data-simplebar >
             {
                this.state.searchProducts.map((a) => (
                  <div key={a.id} >
                    <p>
                    <Link style = {{color:"#FFFFFF"}} to={`/details/${a.productType}/${a.codeOfProduct}`}>
                      <p>{a.productType} ` {a['productName' + this.props.langId]}</p> 
                    </Link>
                    </p>
                  </div>
                ))
              }
             </div>
            </div>
            <div className="four header-card">
            <div className = "notifications">{this.state.basketCount}</div>
              <Link to="/basket" data={this.props.data}><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>

            </div>
            <div className="five header-card">
              <div className="header-bus"> 
              <ModalDelivery />
              </div>
              <img src="/images/delivery-truck.png" />
            </div>
            <div className="six header-card">
                    <button onClick={this.handelClick}>
                      <p className="label">{currentFlag.name}<i className="fa fa-chevron-down"></i></p>
                    </button>
                    <div className = "six-content">

                    <ul className = {cnUl} onClick={this.handelClickFlag}>
                      {
                        flags.map((flag) => {
                          if(flag.id === this.props.langId){
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
                            <img src="/images/menu.svg" />
                          </label>
                          <input type = "checkbox" id = "toggle"/>
                         
                          <nav className = "new-menu">
          <ul className="header-menu-list">
            <li className="list-item">
              <Link to={`/filter/${lang[this.props.langId].types[0]}`} className="list-item-link">
                {lang[this.props.langId].types[0]}
              </Link>
            </li>
            <li className="list-item">
              <Link to={`/filter/${lang[this.props.langId].types[1]}`} className="list-item-link">
                  {lang[this.props.langId].types[1]}
              </Link>
            </li>
            <li className="list-item">
              <Link to={`/filter/${lang[this.props.langId].types[2]}`} className="list-item-link">
                  {lang[this.props.langId].types[2]}
              </Link>
            </li>

            <li className="list-item">
             <div className = "six"> 
                      
                        <button onClick={this.handelClickMore}>
                          <p className="list-item-link">{lang[this.props.langId].more}<i className="fa fa-chevron-down"></i></p>                          
                        </button>
                        <div className = "six-content menu-types">
                            <ul className = {cnMore}>
                              {
                                lang[this.props.langId].types.slice(3).map((elem) => 
                                <li key = {elem}  defaultValue={elem} >
                                <Link to={`/filter/${elem}`} className = "list-item-link-black">
                                {elem}
                                </Link>
                              </li>
                                )
                              } 
                            </ul>
                        </div>
                      </div>
            </li>

            <li className="list-item">
              <Link to="/contact" className="list-item-link">{lang[this.props.langId].contact}</Link>
            </li>
          </ul>
        </nav>
        </div>
      </header>
    )
  }
}

export default Header
