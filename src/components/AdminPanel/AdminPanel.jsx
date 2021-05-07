  
import React, { useState, useEffect, memo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminAdd from '../AdminAdd/AdminAdd';
import axios from '../AxiosPost/AxiosPost';
import "./AdminPanel.css"


const AdminPanel = () => {
    const dispatch = useDispatch();
    const [load, setload] = useState(false);
    const [showAddForm, setForm] = useState(false)
    const [products, setproducts] = useState([]);
    const [state, setstate] = useState({
        productNameHY:'name',
        productNameRU:'name',
        productNameEN:'name',
        productType:'type',
        price:'3000',
        colors:'colors',
        sizes:'sizes',
        descriptionRU:'description',
        descriptionEN:'description',
        descriptionHY:'description',
        promotions:false,
        discounts:'discounts',
        oldPrice:'oldPrice',
        codeOfProduct:'codeOfProduct',
        theBestProduct:false,
        height:'height',
        priceOfMonth:'21300',
        hashtag:'hashtag'
    });
    const language = useSelector((state) => state.Reducer1.language);
    const [image, setimage] = useState([]);
    const [changeProducts, setchangeProducts] = useState([]);
    const changeValue = (e) =>{
        console.log(state)
        const target = e.target
        setstate(prev=>{
            if(target.type === 'checkbox'){
                return {
                    ...state,
                    [target.name]:target.checked
                }
            }
            return {
                ...state,
                [target.name]:target.value,
            }
        })
    }
    const setFile = (e) => {
        // @ts-ignore
        setimage(e.target.files)
    }
    const getProducts = async () => {
        const { data } = await axios.get(`/product/products`)
        const data2 = await axios.get('/trash/getTrashProducts') 
        console.log(data2)
        setproducts(data)
        setchangeProducts(data)
    }
    
    useEffect(() => {
        getProducts()        
    }, [load, language]);;
    const changeProduct = (e, elem, isFile = false) => {
        let arr = [...changeProducts]
        console.log(arr)
        if(!isFile){
            arr = arr.map((el)=>{
                if(el.id === elem.id){
                    if(e.target.type === 'checkbox') {
                        // @ts-ignore
                        el[e.target.name] = e.target.checked
                        return el
                    }
                    // @ts-ignore
                    el[e.target.name] = e.target.value
                }
                return el
            })
            setchangeProducts(arr)
            return 
        }

        arr = arr.map((el)=>{
            if(el.id === elem.id){
                // @ts-ignore
                el[e.target.name] = e.target.files
            }
            return el
        })
        setchangeProducts(arr)
    }
    const submit = async () => {
        setload(true)
        const data = new FormData()
        changeProducts.forEach(elem=>{
            if (!elem.image) {
                return 
            }
            for (let i = 0; i < elem.image.length; i++) {
                console.log(elem.image[i])
                data.append(`${elem.id}`,elem.image[i])
            }
        })
        data.append('data',JSON.stringify(changeProducts))
        await axios.post('/product/edit',data)
        setload(false)
    }
    const AddProduct = async () =>{
        setload(true)
        const data = new FormData()
        data.append('data', JSON.stringify(state))
        for (let i = 0; i < image.length; i++) {
            data.append(`product_image${i}`, image[i])
        }

        await axios.post('/product/add', data)
        setload(false)
    }
    const Deleteproducts = async (e) => {
        setload(true)
        // @ts-ignore
        const data = await axios.post('/trash/addToTrash', {product:e})
        setload(false)
    }
    const changeLanguage = async (e) => {
        dispatch({type:'LANG',payload:e.target.name})
    }

    const search = async (e) => {
        const { value } = e.target
        if (!value) { 
            const { data } = await axios.get(`/product/products`)
            setproducts(data)  
            return 
        }
        const { data:{data} } = await axios.get(`/product/tools/search?info=${value}`)
        setproducts(data)
    }
   
    return (
        <>
                <div className = "type-area">
                <div className = "type-area-head">
                        <img src = "/images/adminTypes.svg" />
                        <h1>Բաժիններ</h1>
                </div>
                <nav className = "nav-bar-admin">
                    <ul className = "admin-ul-list">
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Հեծանիվներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Սայլակներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Եռանիվ հեծանիվներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Սքեյթ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Մանկական մոտոցիկլետներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Մանկական Սայլակներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Ռոլիկներ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Լողավազաններ</a>
                        </li>
                        <li className = "admin-list-item">
                            <a className = "admin-list-item-link">Տոնածառներ</a>
                        </li>
                    </ul>
                    <div className = "admin-add-icons">
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                            <i className = "fa fa-plus"></i>
                    </div>
                </nav>
                    <div className = "type-area-discount">
                        <a href = "#">Ակցիա</a>
                        <i className = "fa fa-plus"></i>
                    </div>
                    <div className = "type-area-contacts">
                        <Link className = "contact-link" to = "/admin/contact">Կոնտակտներ</Link>
                    </div>
                </div>
                    
            {/* <header className="admin-header">
                <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={()=> setForm(prev=>!prev)}></i>
                <button name='hy' onClick={changeLanguage}>հայերեն</button>
                <button name='en' onClick={changeLanguage}>english</button>
                <button name='ru' onClick={changeLanguage}>русский</button>
            </header>
         
            <input type="text" onChange={search} placeholder='search'/>
            <section>
                <button onClick={submit} className = "btn btn-primary">
                    <i className = "fa fa-edit"></i>
                    submit
                </button>
                <div className = "info-languages">

                {
                    language == "hy" ?  <><h1>Հայերեն</h1> </>:
                    language == "en" ? <><h1>English</h1> </>:
                     <><h1>Руский</h1> </>
                }
                </div>
                <div className="create-area">
                    {
                        showAddForm ? 
                        <div className = "create-area-center" style={{display:'flex'}}>
                        <h1>Add Product</h1>
                        <div className = "add-form-group">
                            <input value={state.productNameHY} placeholder='պռոդուկտի անունը' name='productNameHY' onChange={changeValue} type="text"/>
                            <input value={state.productNameEN} placeholder='պռոդուկտի անունը' name='productNameEN' onChange={changeValue} type="text"/>
                            <input value={state.productNameRU} placeholder='պռոդուկտի անունը' name='productNameRU' onChange={changeValue} type="text"/>
                            <input value={state.productType} placeholder='պռոդուկտի տիպը' name='productType' onChange={changeValue} type="text"/>
                            <input value={state.price} placeholder='գին' name='price' onChange={changeValue} type="text"/>
                            <input value={state.colors} placeholder='գույն' name='colors' onChange={changeValue} type="text"/>
                            <input value={state.sizes} placeholder='չափեր' name='sizes' onChange={changeValue} type="text"/>
                            <input value={state.height} placeholder='height' name='height' onChange={changeValue} type='text'/>
                            <input value={state.descriptionHY} placeholder='նկարագություն' name='descriptionHY' onChange={changeValue} type='text'/>
                            <input value={state.descriptionEN} placeholder='նկարագություն' name='descriptionEN' onChange={changeValue} type='text'/>
                            <input value={state.descriptionRU} placeholder='նկարագություն' name='descriptionRU' onChange={changeValue} type='text'/>
                            promotions<input defaultChecked={!!state.promotions} placeholder='promotions' name='promotions' onChange={changeValue} type='checkbox'/>
                            <input value={state.discounts} placeholder='discounts' name='discounts' onChange={changeValue} type='text'/>
                            <input value={state.oldPrice} placeholder='oldPrice' name='oldPrice' onChange={changeValue} type='text'/>
                            <input value={state.codeOfProduct} placeholder='codeOfProduct' name='codeOfProduct' onChange={changeValue} type='text'/>
                            theBestProduct<input name='theBestProduct' defaultChecked={!!state.theBestProduct} onChange={changeValue} type='checkbox'/>
                            <input value={state.month} placeholder='month' name='month' onChange={changeValue} type='text'/>
                            <input value={state.priceOfMonth} placeholder='priceOfMonth' name='priceOfMonth' onChange={changeValue} type='text'/>
                            <input value={state.hashtag} placeholder='hashtag' name='hashtag' onChange={changeValue} type='text'/>
                            <input placeholder='նկար' name='image' multiple onChange={setFile} type='file'/>
                            <button onClick={AddProduct} disabled={state.productNameHY.trim() && state.productType.trim() && state.price.trim()  && state.colors.trim() && state.sizes.trim() && image ? false : true}>ավելացնել ապրանք</button>
                        </div>
                    </div>
                : null    
                } 
                </div>
          
                <div className="assortment-area-cards">
                    {products.map((elem,i)=> {
                        return (
                            <div key={i} className = "discount-cards-one">
                            
                                {JSON.parse(elem.imagePath).map((elem, i)=>
                                
                                    <div key={i} className="discount-img">
                                        <img src="/images/card-background.svg" />
                                        <img  src={elem} className="bicycle-img" />
                                    </div>

                                )}
                               
                                <div className = "add-form-group">
                                <input value={elem.productNameHY} defaultValue={elem.productNameHY} onChange={(e) => changeProduct(e, elem)} name='productNameHY' placeholder='անունը' type="text"/>
                                <input value={elem.productNameEN} defaultValue={elem.productNameEN} onChange={(e) => changeProduct(e, elem)} name='productNameEN' placeholder='անունը' type="text"/>
                                <input value={elem.productNameRU} defaultValue={elem.productNameRU} onChange={(e) => changeProduct(e, elem)} name='productNameRU' placeholder='անունը' type="text"/>
                                <input value={elem.productType} defaultValue={elem.productType} onChange={(e) => changeProduct(e, elem)} name='productType' placeholder='պռոդուկտի անունը' type="text"/>
                                <input value={elem.price} defaultValue={elem.price} onChange={(e) => changeProduct(e, elem)} name='price' placeholder='գինը' type="text"/>
                                <input value={elem.colors} defaultValue={elem.colors} onChange={(e) => changeProduct(e, elem)} name='colors' placeholder='գույները' type="text"/>
                                <input value={elem.sizes} defaultValue={elem.sizes} onChange={(e) => changeProduct(e, elem)} name='sizes' placeholder='չափերը' type="text"/>
                                <input value={elem.height} defaultValue={elem.height} onChange={(e) => changeProduct(e, elem)} name='height' placeholder='չափերը' type="text"/>
                                <input value={elem.descriptionHY} defaultValue={elem.descriptionHY} onChange={(e) => changeProduct(e, elem)} name='descriptionHY' placeholder='նկարագրություն' type="text"/>
                                <input value={elem.descriptionEN} defaultValue={elem.descriptionEN} onChange={(e) => changeProduct(e, elem)} name='descriptionEN' placeholder='նկարագրություն' type="text"/>
                                <input value={elem.descriptionRU} defaultValue={elem.descriptionRU} onChange={(e) => changeProduct(e, elem)} name='descriptionRU' placeholder='նկարագրություն' type="text"/>
                                promotions<input onChange={(e) => changeProduct(e, elem)} name='promotions' defaultChecked={!!elem.promotions} type="checkbox"/>
                                theBestProduct<input onChange={(e) => changeProduct(e, elem)} name='theBestProduct' defaultChecked={!!elem.theBestProduct} type="checkbox"/>
                                <input value={elem.discounts} defaultValue={elem.discounts} onChange={(e) => changeProduct(e, elem)} name='discounts' placeholder='discounts' type="text"/>
                                <input value={elem.oldPrice} defaultValue={elem.oldPrice} onChange={(e) => changeProduct(e, elem)} name='oldPrice' placeholder='oldPrice' type="text"/>
                                <input value={elem.month} defaultValue={elem.month} onChange={(e) => changeProduct(e, elem)} name='month' placeholder='month' type="text"/>
                                <input value={elem.priceOfMonth} defaultValue={elem.priceOfMonth} onChange={(e) => changeProduct(e, elem)} name='priceOfMonth' placeholder='priceOfMonth' type="text"/>
                                <input value={elem.codeOfProduct} defaultValue={elem.codeOfProduct} onChange={(e) => changeProduct(e, elem)} name='codeOfProduct' placeholder='codeOfProduct' type="text"/>
                                <input value={elem.hashtag} defaultValue={elem.hashtag} onChange={(e) => changeProduct(e, elem)} name='hashteg' placeholder='hashteg' type="text"/>
                                <input multiple onChange={(e)=>changeProduct(e, elem, true)} name='image' type='file'/>
                                    <input multiple onChange={(e)=>changeProduct(e,elem,true)} name='image' type='file'/>
                                </div>
                                <br />
                                <mark>Տվյալների փոփոխությունը պահպանելու համար սեղմել <u>submit</u> կոճակին </mark>
                                <br />
                                <button onClick={Deleteproducts.bind(null,elem)} className = "btn btn-danger">
                                    <i className="fa fa-trash-o" aria-hidden="true" ></i>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section> */}
        </>
    )
}

export default memo(AdminPanel);