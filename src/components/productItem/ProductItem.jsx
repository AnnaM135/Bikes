
import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class ProductItem extends Component {

    constructor(props) {
        super(props)
    
        // this.state = {
             
        // }
    }
    

    render() {
        return (
            <div  className="discount-cards-one">    
            {JSON.parse(this.props.elem.imagePath).map((elem,i) => 
                <div className="discount-img">
                    <img src="/images/card-background.svg" />
                    <Link to = "/basket"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                    <img src="/images/bicycle.svg" className="bicycle-img" />
                    {/* <img src={elem} className="bicycle-img" /> */}
                </div>
            )}             
           
            <div>
                <div>
                    <Link to = {`/filter/${this.props.elem.productType}/${this.props.elem.productName}`}>
                    <p>Գույն</p> </Link>
                    <div className="color-buttons">
                        <div style = {{backgroundColor: `${this.props.elem.colors}`}}></div>
                        <div style={{backgroundColor: "yellow"}}></div>
                        <div style={{backgroundColor: "silver"}}></div>
                        <div style={{backgroundColor: "grey"}}></div>
                        <div style={{backgroundColor: "black"}}></div> 
                    </div>
                </div>
                <div>{this.props.elem.productType}</div>
                <div>{this.props.elem.description}</div>
                <div className="price-add">
                    <p>{this.props.elem.price} Դր</p>
                    <button className="price-btn">Գնել</button>
                </div>      
            </div>
        </div>
        )
    }
}

export default ProductItem
