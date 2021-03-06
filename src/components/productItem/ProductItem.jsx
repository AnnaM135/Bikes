
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { lang } from "../../lang"
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import "../../App.css"
import "../filter/filter.css"



export class ProductItem extends Component {

    constructor(props) {
        super(props)
    
       
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
        return (
            <div  className="discount-cards-one">    
            {JSON.parse(this.props.elem.imagePath).map((elem,i) => 
                <div key = {elem} className="discount-home-img">
                    <img src="/images/card-background.svg" />
                    <Link to = "/basket"><i onClick={this.addCard.bind(this, this.props.elem)} className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                    <img src={elem} className="bicycle-img" />
                </div>
            )}             
           
            <div>
                <div className = "card-context">
                    {/* <Link to = {`/filter/${this.props.elem.productType}/${this.props.elem.productName}`}>
                    <p>Ավելին</p> </Link> */}
                    <div className="color-buttons">
                        <div style = {{backgroundColor: `${this.props.elem.colors}`}}></div>
                        <div style = {{backgroundColor: 'red'}}></div>
                        <div style = {{backgroundColor: 'black'}}></div>
                        <div style = {{backgroundColor: 'grey'}}></div>
                        <div style = {{backgroundColor: 'yellow'}}></div>
                    </div>
                </div>
                <div className = "card-context">

                <div>{this.props.elem['productName' + this.props.langData.langId]}</div>
                <div>{this.props.elem['description' + this.props.langData.langId]}</div>
                <div className="price-add">
                    <p>{this.props.elem.price} Դր</p>
                    <Link to = {`/details/${this.props.elem.productType}/${this.props.elem.codeOfProduct}`}>
                         <button className="price-btn">{lang[this.props.langData.langId].buy}</button>
                    </Link>
                </div>      
                </div>
            </div>
        </div>
 
        )
    }
}

function mapstatetoprops(state) {
    return {
        langData: state.langReducer
    }
}
const mapDispatchToProps = {
    changeData
}
export default connect(mapstatetoprops, mapDispatchToProps)(ProductItem)
