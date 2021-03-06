import React, { Component } from 'react'
import Header from "../header/header"
import Footer from "../footer/Footer"
import "./filter.css"
import { Link } from 'react-router-dom';
import "../../App.css"
import AdminServices from '../../services/AdminServices';
import { connect } from "react-redux"
import { changeData } from "../../store/languages/action"
import { lang } from "../../lang"
import classnames from "classnames";
import { getAllFilters } from '../../services/FilterOptionUtils';
import ProductItem from '../productItem/ProductItem';
import { filterData } from '../../services/FilterDataUtils';



export class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            pages: [],
            product: [],
            currentPage: 1,
            startIndex: 0,
            showList: false,
            show: [],
            filterValues: {
                colors: [],
                types: [],
                discounts: [],
                sizes: [],
                heights: []

            },
            filterInp: {
                type: "",
                minPrice: "",
                maxPrice: "",
                color: "",
                discount: "",
                size: "",
                height: "",
            },


        }
    }



    componentDidMount() {

        AdminServices.getProducts().then((r) => {

            this.setState({
                filterValues: getAllFilters(r.data),
                data: r.data
            });
            this.setState({
                filterInp: {
                    type: this.props.match.params.type
                }
            });
            this.filter();
        })

    }
    handelClick = (event) => {
        this.setState((prevState) => ({
            showList: !prevState.showList,
        }))
    }

    handelChangeLang = (id) => {
        this.props.changeData(id)
    }
    change(e) {
        if ((e.target.name === 'minPrice' || e.target.name === 'maxPrice') && isNaN(+e.target.value)) {
            return
        }
        let key = e.target.name;
        this.setState({
            filterInp : {
                key : e.target.value
            }
        });        
    }


    filter() {

        const itemPerPage = 9;


        let rest = filterData(this.state.data, this.state.filterInp);
        let n = Math.ceil(rest.length / itemPerPage);



        this.setState({
            pages: Array.from({ length: n }, (_, i) => i + 1)
        });

        rest = this.paginate(rest, itemPerPage, this.state.currentPage);

        this.setState({
            show: rest
        })

    }

    paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }


    setTypes(a) {

        this.setState({
            filterInp : {
                type : a
            }
        });
        
       
    }
    openPage(x) {

        this.setState({
            currentPage: x
        }, () => {
            this.filter();
        });
        

    }
    prev() {

        if(this.state.currentPage == this.state.pages[0]){
            return;
        }

        this.setState((oldState, props) => ({
            currentPage: oldState.currentPage - 1
        }), () => {
            this.filter();
        });
        
    }
    next() {

        if(this.state.currentPage == this.state.pages[this.state.pages.length - 1]){
            return;
        }

        this.setState((oldState, props) => ({
            currentPage: oldState.currentPage + 1
        }),() => {
            this.filter()
        });

        
    }
    changeColor(a) {
        

        this.setState({
            filterInp : {
                color : a
            }
        })
      
    }

    updatePage(){
        this.componentDidMount()
        this.setState({})
    }

    render() {
        const cnUl = classnames({ "flag-list": true, "not-active": !this.state.showList, })
        return (
            <div className="assortment-col">
                <Header handelChangeLang={this.handelChangeLang} langId={this.props.langData.langId} />
                <div className="assortment-row">
                    <div className="assortment-col-one">
                        <div className="filter-head head-end">
                            <Link to="/" style = {{color: "#1D1D1D"}} className = "filter-head-icon"><p class="fa fa-arrow-left" aria-hidden="true"></p></Link>
                            <Link to="/" className = "filter-head-par" ><p>??????????????</p></Link>
                        </div>


                        <div className="filter">
                            <div>
                                <div className="filter-title">?????????? </div>
                                <div className="select">
                                    {/* <div className="select-center">
                                        <button onClick={this.handelClick}>
                                            <p className="label">??????????<i className="fa fa-chevron-down"></i></p>
                                        </button>
                                        <ul className={cnUl}>

                                            {
                                                this.state.filterValues.types.map(a => {
                                                    return (
                                                        <li key={a} class = "type-button">
                                                            <button onClick={this.setTypes.bind(this, a)} type="button">
                                                                <p>{a}</p>
                                                            </button>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>


                                    </div> */}
                                </div>
                                <hr />
                                <div className="select-price">
                                    <div className="price">
                                        <p>{lang[this.props.langData.langId].price}</p>
                                    </div>
                                    <div className="type-price">
                                        <p>{lang[this.props.langData.langId].from}</p>
                                        <div className="before">
                                            <input type="text" name="minPrice" placeholder="0" value={this.state.filterInp.minPrice} onChange={this.change.bind(this)} />
                                        </div>
                                        <p>{lang[this.props.langData.langId].to}</p>
                                        <div className="after">
                                            <input type="text" name="maxPrice" placeholder="1260" value={this.state.filterInp.maxPrice} onChange={this.change.bind(this)} />
                                        </div>
                                    </div>
                                    {/* <div className="select-range">
                                    <div className="rangeslider">
                                        <input className="min" name="range_1" type="range" min="1" max="100" value="10" />
                                        <input className="max" name="range_1" type="range" min="1" max="100" value="90" />
                                        <span className="range_min light left">10.000 ???</span>
                                        <span className="range_max light right">90.000 ???</span>
                                    </div>
                                </div> */}
                                </div>
                                <hr />
                                <div className="select-color">
                                    <div className="price">
                                        <p>{lang[this.props.langData.langId].color}</p>
                                    </div>
                                    <div className="color-buttons">
                                        {
                                            this.state.filterValues.colors.map(a => {
                                                return (
                                                    <div key={a} onClick={this.changeColor.bind(this, a)} style={{ backgroundColor: `${a}` }}></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="select-sale">
                                    <div className="price">
                                        <p>{lang[this.props.langData.langId].discount}</p>
                                    </div>
                                    <div className="sale-buttons">
                                        {
                                            this.state.filterValues.discounts.map(a => {
                                                return (
                                                    <div key={a}>
                                                        <input type="radio" id="male" name="discount" value={a} onChange={this.change.bind(this)} />
                                                        <label htmlFor="male">{a}</label>
                                                    </div>
                                                )
                                            })


                                        }
                                        <div >
                                            <input type="radio" name="discount" value='' onChange={this.change.bind(this)} />
                                            <label htmlFor="male">{lang[this.props.langData.langId].all}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="select-sale">
                                    <div className="price">
                                        <p>{lang[this.props.langData.langId].height}</p>
                                    </div>
                                    <div className="sale-buttons">

                                        {
                                            this.state.filterValues.heights.map(a => {
                                                return (
                                                    <div key={a + this.props.match.params.type}>
                                                        <input type="radio" id="height1" name="height" value={a} onChange={this.change.bind(this)} />
                                                        <label htmlFor="height1">{a}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div >
                                            <input type="radio" name="height1" value='' onChange={this.change.bind(this)} />
                                            <label htmlFor="height1">{lang[this.props.langData.langId].all}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="select-sale">
                                    <div className="price">
                                        <p>{lang[this.props.langData.langId].size}</p>
                                    </div>

                                    <div className="sale-buttons">
                                        {
                                            this.state.filterValues.sizes.map(a => {
                                                return (
                                                    <div key={a}>
                                                        <input type="radio" id="size1" name="size" value="size1" value={a} onChange={this.change.bind(this)} />
                                                        <label htmlFor="size1">{a}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div >
                                            <input type="radio" name="size" value='' onChange={this.change.bind(this)} />
                                            <label htmlFor="size">{lang[this.props.langData.langId].all}</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="select">
                                    <div className="select-btn">
                                        <button onClick={this.filter.bind(this)}>{lang[this.props.langData.langId].apply}</button>
                                    </div>
                                </div>
                                <div className="select-update">
                                    <a onClick = {this.updatePage.bind(this)} href = "">??????????????????</a>
                                </div>
                            </div>

                        </div>
                        <div className="assortment-col-three">
                            <div className="our-pluses">
                                <img src="/images/bike-pluses.svg" />
                                <p>{lang[this.props.langData.langId].low}
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </p>
                                <p>{lang[this.props.langData.langId].big}
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </p>
                                <p>{lang[this.props.langData.langId].fast}
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </p>
                                <p>{lang[this.props.langData.langId].service}
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                    </p>
                            </div>
                            {/* <div className="our-pluses-icon">
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                <i className="fa fa-chevron-down" aria-hidden="true"></i>
                            </div> */}
                        </div>
                    </div>
                    <div className="assortment-col-two">
                        <div className="filter-head">
                            <img src = "/images/bike-filter.svg" className = "filter-icon-bike"/> 
                            <p className="filter-head-bike" style = {{fontSize: "28px"}}>{lang[this.props.langData.langId].types[0]}</p>
                        </div>
                        <div className="assortment-area-cards">
                            {
                                this.state.show.map((cur, i) => (

                                    <ProductItem key={i} elem={cur} />

                                ))
                            }


                        </div>
                        <div className="pagination">
                            <i class="fa fa-chevron-left" aria-hidden="true" onClick={this.prev.bind(this)}></i>

                            <ul>
                                {
                                    this.state.pages.map((pageItem, index) => {
                                        return (
                                            <li key={index} onClick={this.openPage.bind(this, pageItem)} >
                                                {pageItem}
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            <i class="fa fa-chevron-right" aria-hidden="true" onClick={this.next.bind(this)}></i>
                        </div>
                    </div>
                </div>
                <Footer />

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

export default connect(mapstatetoprops, mapDispatchToProps)(Filter)
