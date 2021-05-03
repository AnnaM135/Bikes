import React, { Component } from 'react'
import Footer from "../footer/Footer"
import "./basket.css"
import "../../App.css"
import Header from '../header/header'
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"
import Payment from '../Modal/Payment'
import SelectPayment from '../Modal/SelectPayment'
import SelectCardPayment from '../Modal/SelectCardPayment'
import CallBack from '../Modal/CallBack'
                                                                                                                                                                                                                                                                                                                                                                                                                       
class Basket extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: [],
            card: [],
            sum: 0,
            counter: 1,
            currentModal:1,
            firstStep:{
               
            }
        }
    }
    componentDidMount() {
       let item = JSON.parse(localStorage.getItem("item"))
       this.state.data = item || []
       this.sum()
       this.setState({})
    }
    minusProd(elem){
        elem.count--
        if(elem.count < 1){
            elem.count = 1
        }
        // if(elem.count === 0){
        //     let existingEntries = JSON.parse(localStorage.getItem("item"));
        //     existingEntries  = existingEntries.filter(e => e.id != elem.id); 
        //    localStorage.setItem("item",JSON.stringify(existingEntries) )
        //    this.setState({})
        // }
        // this.sum()
        // this.componentDidMount()
        this.setState({})
    }
    plusProd(elem){
        elem.count++
        this.sum()
        this.setState({})
    }
    cancel(elem){
        let existingEntries = JSON.parse(localStorage.getItem("item"));
        existingEntries  = existingEntries.filter(e => e.id != elem); 
        localStorage.setItem("item",JSON.stringify(existingEntries) )
        this.sum()
        this.componentDidMount()
        this.setState({})
    }
    handelChangeLang = (id) => this.props.changeData(id)
    sum(){
        let s = 0
        this.state.data.forEach(item => {            
            s += item.count*item.price
        })
        this.state.sum = s
        this.setState({})
    }
    render() {
        // console.log("user data",this.state.firstStep)
        // console.log("product data", this.state.data)
        return (
            <div className="basket-page">
                <Header  handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
            <div className="basket-page-center">
                <div className = "basket-cards-col">
                {
                    this.state.data.map((elem,id) => (
                        <div key = {id} className="basket-item">
                           
                            {JSON.parse(elem.imagePath).map((elem,i) => 
                                <div className="basket-card">
                                    <div className="discount-home-img">
                                        <img src="/images/card-background.svg" />
                                        <img src="/images/bicycle.svg" className="bicycle-img" />
                                    </div>
                                </div>
                            )}  
                             <div className="basket-card-description">
                        <div>
                            <p>{elem['productName' + this.props.langData.langId]}</p>
                            <p>{elem['description' + this.props.langData.langId]}</p>
                            <p>{elem.code}</p>
                        </div>
                        <div className="basket-card-count">
                            <div>
                                <i className="fa fa-minus" aria-hidden="true" onClick = {this.minusProd.bind(this, elem)}></i>
                            </div>
                                <p>{elem.count}</p>
                            <div>
                                <i className="fa fa-plus" aria-hidden="true" onClick = {this.plusProd.bind(this, elem)}></i>
                            </div>
                        </div>
                    </div>
                    <div className="basket-cancel">
                        <i className="fa fa-times" aria-hidden="true" onClick = {this.cancel.bind(this, elem.id)}></i>
                        <p className="basket-price">{elem.price}</p>
                    </div>
                        </div>
                    ))
                }
                </div>
               
                <div className="basket-pay">
                    <div className="basket-general">
                        <p>Ընդհանուր </p>
                        <p className="basket-price">{this.state.sum} ֏</p>
                    </div>
                    <hr className="basket-hr" />
                    <div className="basket-price-btn">
                        <button>
                  {/* <a className = "link-white"><div handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId}  onClick = {() => {this.handleModal()}}>{lang[this.props.langData.langId].buy} </div></a> */}

                            {this.state.currentModal == 1 && <Payment first = {this.state.firstStep} data = {this.state.data}  setState={this.setState.bind(this)} />}
                            {this.state.currentModal == 2 && <SelectPayment first = {this.state.firstStep} data = {this.state.data} setState={this.setState.bind(this)} />}
                            {this.state.currentModal == 3 && <SelectCardPayment first = {this.state.firstStep} data = {this.state.data} setState={this.setState.bind(this)} />}
                            {this.state.currentModal == 4 && <CallBack data = {this.state.data} setState={this.setState.bind(this)} />}

                        </button>
                    </div>
                    <div className="basket-pay-versions">
                        <img src="./images/ameria.svg"/>
                        <img src="/images/master-card.svg" />
                        <img src="/images/visa.svg" />
                        <img src="/images/idram.svg" />
                    </div>
                <div className = "payment-methods">
                    <hr />
                    <h1>{lang[this.props.langData.langId].paymentHead}</h1>
                    <p>
                    {lang[this.props.langData.langId].paymentPar}
                    </p>
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

export default connect(mapstatetoprops, mapDispatchToProps)(Basket)
