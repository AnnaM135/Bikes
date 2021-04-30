import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./list.css"
import "../filter/filter.css"
import Header from "../header/header"
import Footer from "../footer/Footer"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
// import {changeCard} from "../../store/languages/action"
import { lang } from "../../lang"
import AdminServices from '../../services/AdminServices';
import classnames from "classnames";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Pagination]);

export class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            card: [],
            product: [],
            slideImg: [],
            showSize: false,
            showHeight: false,
        }
    }

    componentDidMount() {
        AdminServices.getProductType(this.props.langData.langId, { productType: this.props.match.params.type })
            .then(r => {
                //  this.state.product = r.data.data
                //this.setState({})
                this.setState({
                    product: r.data.data
                });
            })
        AdminServices.getProductsItem(this.props.match.params.item).then((r) => {


            this.setState({
                data: r.data.data,
                slideImg: r.data.data.imagePath

            });


        })
    }
    handelChangeLang = (id) => {
        this.props.changeData(id)

    }
    handelClickSize = (event) => {
        console.log(this.state.showSize)
        this.setState((prevState) => ({
            showSize: !prevState.showSize,
        }))
    }
    handelClickHeight = (event) => {
        console.log(this.state.showHeight)
        this.setState((prevState) => ({
            showHeight: !prevState.showHeight,
        }))
    }
    handelClickFlag = (event) => {
        const { id } = event.target.dataset;
        console.log(id)
        if (this.state.data.sizes !== id) {
            this.state.data.sizes = id
          //this.props.handelChangeLang(id)
          this.setState({
            showList: false,
          })
          console.log(this.state.data.sizes, id)
        }
      }
      handelClickActiveHeight = (event) => {
        const { id } = event.target.dataset;
        console.log(id)
        if (this.state.data.sizes !== id) {
            this.state.data.sizes = id
          //this.props.handelChangeLang(id)
          this.setState({
            showList: false,
          })
          console.log(this.state.data.sizes, id)
        }
      }

    addCard(item) {
        item.count = 1
        let local = localStorage.getItem("item")
        let names;
        if (local === null) {
            names = []
        } else {
            names = JSON.parse(local)
            let d = names.find(elem => elem.id == item.id)
            if (d) {
                item.count = 2
                names = names.filter(elem => elem !== item)
                return
            }
        }
        names.push(item)
        localStorage.setItem("item", JSON.stringify(names))
        this.setState({})
    }


    render() {
        const cnUl = classnames({ "size-list": true, "not-active": !this.state.showSize, })
        const cnHeight = classnames({ "size-list": true, "not-active": !this.state.showHeight, })
        return (
            <div className="product-page">
                <Header data={this.state.card} handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId} />
                <div className="product-page-area">
                    <div className="product-img-area">
                        <div className="product-slider">
                            <Swiper pagination={{ clickable: true }} >
                                <SwiperSlide>
                                    <div className='slide'
                                        style={{ width: "100%" }}
                                    >

                                        <div className="product-slider-img" style={{ background: "none" }}>
                                            <img src="/images/card-background.svg" className="product-slider-back-img" />
                                            <img src="/images/bicycle.svg" className="product-bicycle-img" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div classNmae='slide'
                                        style={{ width: "100%" }}
                                    >

                                        <div classNmae="product-slider-img" style={{ background: "none" }}>
                                            <img src="/images/card-background.svg" className="product-slider-back-img" />
                                            <img src="/images/bicycle.svg" className="product-bicycle-img" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <div className="swiper-pagination"></div>
                            </Swiper>
                            <div className="about-product">
                                <h3>{this.state.data.productName}</h3>
                                <p>{this.state.data.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-description-area">
                        <br /> <br />
                        <div className="product-star">
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                            <i className="fa fa-star-o" aria-hidden="true"></i>
                        </div>
                        <div className="product-code">
                            <p>Code 654236853</p>
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
                            <div className="list-price">
                                <p style = {{position: "absolute"}}>{lang[this.props.langData.langId].color}</p>
                            </div>
                            <div className="color-buttons">
                                <div style={{ backgroundColor: "red" }}></div>
                                <div style={{ backgroundColor: `${this.state.data.colors}` }}></div>
                            </div>
                        </div>
                        <div onClick={this.handelClickSize} className="select-sale">
                            <div  className="list-price" >
                                <p>{lang[this.props.langData.langId].size}</p>
                                <ul className = {cnUl} onClick={this.handelClickFlag}>
                                    
                                            <li >
                                            <button  type="button" className = "active-btn">
                                            Ընտրել  չափսը
                                                <p selected value = "Ընտրել հասակը և չափսը"></p>
                                                <p data-id={this.state.data.sizes}>{this.state.data.sizes}</p>
                                            </button>
                                            </li>
                                            
                                       
                                </ul>
                                <p style = {{cursor: "pointer"}}  className="fa fa-chevron-down" aria-hidden="true"></p>
                            </div>
                        </div>
                        <div onClick={this.handelClickHeight} className="select-sale">
                            <div className="list-price">
                                <p>{lang[this.props.langData.langId].height}</p>
                                <p style = {{cursor: "pointer"}}  className="fa fa-chevron-down" aria-hidden="true"></p>
                            </div>
                            <div className="sale-buttons">

                                <div>
                                    <ul className = {cnHeight} onClick={this.handelClickActiveHeight}>
                                    <li>
                                            <button  type="button" className = "active-btn">
                                            Ընտրել հասակը
                                                <input type="checkbox" name="" />
                                                <p  data-id={this.state.data.sizes} className = "size-par">{this.state.data.height}</p>
                                            </button>
                                            </li>
                                    </ul>
                                   
                                </div>
                               
                            </div>
                        </div>
                        <div className="product-buttons">
                            <button className="product-add-btn" onClick={this.addCard.bind(this, this.state.data)}>{lang[this.props.langData.langId].add}</button>
                            <button className="product-buy-btn" onClick={this.addCard.bind(this, this.state.data)}>
                                <Link className = "buy-btn" to = "/basket">{lang[this.props.langData.langId].buy}</Link>
                                {/* {lang[this.props.langData.langId].buy} */}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="same-product">
                    <h1 className="same-product-title">{lang[this.props.langData.langId].similar}</h1>
                    <div className="same-product-cards">
                        {
                            this.state.product.map((elem, i) => (
                                <div key={i} className="same-product-cards-one">
                                    {JSON.parse(elem.imagePath).map((elem, i) =>
                                        <div className="same-product-img">
                                            <img src="/images/card-background.svg" />
                                            {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                            <img src="/images/bicycle.svg" className="bicycle-img" />
                                        </div>
                                    )}
                                    <div className = "card-context">
                                            <div className="color-buttons">
                                                <div style={{ backgroundColor: `${elem.colors}` }}></div>
                                                <div style={{ backgroundColor: "red" }}></div>
                                                <div style={{ backgroundColor: "black" }}></div>
                                                <div style={{ backgroundColor: "grey" }}></div>
                                                <div style={{ backgroundColor: "yellow" }}></div>
                                            </div>
                                            <div className = "card-context">

                                            <div>{elem.productName}</div>
                                            <div>{elem.description}</div>
                                            <div className="price-add">
                                            <p>{elem.price} Դր</p>
                                            <Link to = {`/filter/${elem.productType}/${elem.productName}`}>
                                                    <button className="price-btn">{lang[this.props.langData.langId].buy}</button>
                                            </Link>
                                            </div>
                                                
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

function mapstatetoprops(state) {
    return {
        langData: state.langReducer,
        // basketReducer
    }
}
const mapDispatchToProps = {
    changeData,
    //  changeCard
}


export default connect(mapstatetoprops, mapDispatchToProps)(List)
