import React, { Component } from 'react'
import Filter from "../filter/filter"
import Footer from "../footer/Footer"
import "./basket.css"
import "../../App.css"
import Header from '../header/header'
import {connect} from "react-redux"
import {changeData} from "../../store/languages/action"
import {lang} from "../../lang"
import AdminServices from '../../services/AdminServices'

export class Basket extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            data: [],
            card: [],
            sum: 0,
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
        if(elem.count === 0){
            let existingEntries = JSON.parse(localStorage.getItem("item"));
            existingEntries  = existingEntries.filter(e => e.id != elem.id); 
           localStorage.setItem("item",JSON.stringify(existingEntries) )
           this.setState({})
        }
        this.sum()
        this.componentDidMount()
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
        return (
            <div class="basket-page">
                <Header  handelChangeLang = {this.handelChangeLang} langId = {this.props.langData.langId}/>
            <div class="basket-page-center">
                <div className = "basket-cards-col">
                {
                    this.state.data.map((elem,id) => (
                        <div key = {id} class="basket-item">
                           
                            {JSON.parse(elem.imagePath).map((elem,i) => 
                                <div class="basket-card">
                                    <div class="discount-home-img">
                                        <img src="/images/card-background.svg" />
                                        <img src="/images/bicycle.svg" className="bicycle-img" />
                                    </div>
                                </div>
                            )}  
                             <div class="basket-card-description">
                        <div>
                            <p>{elem.productName}</p>
                            <p>{elem.description}</p>
                            <p>{elem.code}</p>
                        </div>
                        <div class="basket-card-count">
                            <div>
                                <i class="fa fa-minus" aria-hidden="true" onClick = {this.minusProd.bind(this, elem)}></i>
                            </div>
                                <p>{elem.count}</p>
                            <div>
                                <i class="fa fa-plus" aria-hidden="true" onClick = {this.plusProd.bind(this, elem)}></i>
                            </div>
                        </div>
                    </div>
                    <div class="basket-cancel">
                        <i class="fa fa-times" aria-hidden="true" onClick = {this.cancel.bind(this, elem.id)}></i>
                        <p class="basket-price">{elem.price}</p>
                    </div>
                        </div>
                    ))
                }
                </div>
               
                <div class="basket-pay">
                    <div class="basket-general">
                        <p>Ընդհանուր </p>
                        <p class="basket-price">{this.state.sum} ֏</p>
                    </div>
                    <hr class="basket-hr" />
                    <div class="basket-price-btn">
                        <button>Գնել</button>
                    </div>
                    <div class="basket-pay-versions">
                        <img src="images/master-card.svg" />
                        <img src="images/visa.svg" />
                        <img src="images/idram.svg" />
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
