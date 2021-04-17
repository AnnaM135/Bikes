import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import classnames from "classnames";
import { flags } from "../languages/data";
import AdminServices from '../../services/AdminServices';




export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            types: [],
            bikes_hy: [],
            bikes_en: [],
            showList: false,
            search: "",
            searchProducts: []
        }
    }
    componentDidMount() {
        AdminServices.getProducts(this.props.langId).then((r) => {
            this.state.data = r.data
            this.state.data.forEach(elem => (
             this.state.types.push(elem.productType)
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
    changeSearch(e){
        this.state.searchProducts = [];
        this.state[e.target.getAttribute("data-id")] = e.target.value;
        this.setState({})
        AdminServices.getProducts(this.props.langId).then((r) => {
          const data = r.data.filter((elem)=> !elem.productName.search(this.state.search))
          if(this.state.search != ""){
            this.state.searchProducts = data
            this.setState({})
          }
        })
      }

    handelClickFlag = (event) => {
        const {id} = event.target.dataset;
      if(this.props.langId !== id){
        this.props.handelChangeLang(id)
        this.setState({
            showList: false,
        })
      }
    }
    render() {
         const cnUl = classnames({ "activePage": true, "not-active": !this.state.showList, })
        const currentFlag = flags.find((flag) => flag.id === this.props.langId)
        if (!currentFlag) {
            return null
        }
        return (
            <header className="header header-black">
            <div className="header-line">
                <div className="wrapper">
                    <div className="one header-card">
                        <Link className="list-item-link" to = "/">LOGOBIKE</Link>
                    </div>
                    <div className = "one-menu header-card">
                      <img src = "../images/menu.svg" onClick = {this.handelClickMenu}/>
                    </div>
                    <div className="two header-card">
                        <i className="fa fa-phone" ></i>
                        <a className="phone" href="tel" >+374 444444</a>
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
                        <Link to = "/basket" data = {this.props.data}><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
    
                    </div>
                    <div className="five header-card">
                        <div className="header-bus"> 24 ժամյա առաքում</div>
                        <img src="/images/delivery-truck.png" />
                    </div>
                    <div className="six header-card">
                    <button onClick={this.handelClick}>
                      <p className="label">{currentFlag.name}<i className="fa fa-chevron-down"></i></p>
                    </button>
                    <ul className = {cnUl} onClick = {this.handelClickFlag}>
                      {
                        flags.map((flag) => {
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
        </header>
        )
    }
}

export default Header
