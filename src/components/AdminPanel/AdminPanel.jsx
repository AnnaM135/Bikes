  
import React, { useState, useEffect, memo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../AxiosPost/AxiosPost';
import "./AdminPanel.css"


const AdminPanel = () => {
    const dispatch = useDispatch();
    const [load, setload] = useState(false);
    const [showAddForm, setForm] = useState(false)
    const [products, setproducts] = useState([]);
    const [state, setstate] = useState({
        productName:'name',
        productType:'type',
        price:'3000',
        colors:'colors',
        sizes:'sizes',
        height: "",
        description:'description',
        promotions:'promotions',
        discounts:'discounts',
        stars: "",
        month: "",
        priceOfMonth: "",
        oldPrice:'oldPrice',
        codeOfProduct:'codeOfProduct',
        theBestProduct:false,
        hashteg: ""
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
        const data = await axios.get(`/product/products${language}`)
        setproducts(data.data)
        setchangeProducts(data.data)
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
        data.append('language', language)
        for (let i = 0; i < image.length; i++) {
            data.append(`product_image${i}`,image[i])
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
        const {data} = await axios.get(`/product/tools/search${value}`)
        console.log(data)
    }
   
    return (
        <>
            <div className = "admin-header-black"></div>
            <div className = "archive-trash">
                <div className = "archive-elements">
                    <h4>PRODUCT TYPE</h4>
                    <div className = "archive-icon">
                        <h4>Արխիվ</h4>
                        <i class="fa fa-archive" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div className = "admin-header-search">
                <button className = "change-btn">Հաստատել փոփոխությունները</button>
                    <div className = "admin-search-area">
                        <input type = "text" placeholder = "Փնտրել"/>
                        <i className = "fa fa-search"></i>
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
                            <input  placeholder='ապրանքի անունը' name='productName' onChange={changeValue} type="text"/>
                            <input  placeholder='ապրանքի տիպը' name='productType' onChange={changeValue} type="text"/>
                            <input  placeholder='գին' name='price' onChange={changeValue} type="number"/>
                            <input  placeholder='գույն' name='colors' onChange={changeValue} type="text"/>
                            <input  placeholder='չափեր' name='sizes' onChange={changeValue} type="text"/>
                            <input  placeholder='հասակ' name='height' onChange={changeValue} type="text"/>
                            <input  placeholder='stars' name='stars' onChange={changeValue} type="text"/>
                            <input  placeholder='month' name='month' onChange={changeValue} type="text"/>
                            <input  placeholder='hashteg' name='hashteg' onChange={changeValue} type="text"/>
                            <input  placeholder='priceOfMonth' name='priceOfMonth' onChange={changeValue} type="text"/>
                            <input  placeholder='նկարագություն' name='description' onChange={changeValue} type='text'/>
                            <input  placeholder='ակցիա' name='promotions' onChange={changeValue} type='text'/>
                            <input  placeholder='զեղչ' name='discounts' onChange={changeValue} type='text'/>
                            <input  placeholder='նախկին արժեքը' name='oldPrice' onChange={changeValue} type='text'/>
                            <input  placeholder='codeOfProduct' name='codeOfProduct' onChange={changeValue} type='text'/>                            
                            <label className = "best-label" htmlFor="theBestProduct">Lավագույն առաջարկ </label>
                            <input placeholder='նկար' name='image' multiple onChange={setFile} type='file'/>                          
                            <input className = "best-input" name='theBestProduct'  onChange={changeValue} type='checkbox'/> 
                            <button className = "add-btn" onClick={AddProduct} disabled={state.productName.trim() && state.productType.trim() && state.price.trim()  && state.colors.trim() && state.sizes.trim() && image ? false : true}>ավելացնել ապրանք</button>
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
                                        <img src="./images/card-background.svg" />
                                        <img  src={elem} className="bicycle-img" />
                                    </div>

                                )}
                               
                                <div className = "add-form-group">
                                    <input value={elem.productName}  onChange={(e)=>changeProduct(e, elem)} name='productName' placeholder='անունը' type="text"/>
                                    <input value={elem.productType}  onChange={(e)=>changeProduct(e, elem)} name='productType' placeholder='պռոդուկտի անունը' type="text"/>
                                    <input value={elem.price}  onChange={(e)=>changeProduct(e, elem)} name='price' placeholder='գինը' type="text"/>
                                    <input value={elem.colors}  onChange={(e)=>changeProduct(e, elem)} name='colors' placeholder='գույները' type="text"/>
                                    <input value={elem.sizes}  onChange={(e)=>changeProduct(e, elem)} name='sizes' placeholder='չափերը' type="text"/>
                                    <input value={elem.height}  onChange={(e)=>changeProduct(e, elem)} name='height' placeholder='հասակ' type="text"/>
                                    <input value={elem.description} onChange={(e)=>changeProduct(e, elem)} name='description' placeholder='նկարագրություն' type="text"/>
                                    <input value={elem.discounts}  onChange={(e)=>changeProduct(e, elem)} name='discounts' placeholder='discounts' type="text"/>
                                    <input value={elem.promotions}  onChange={(e)=>changeProduct(e, elem)} name='promotions' placeholder='promotions' type="text"/>
                                    <input value={elem.stars}  onChange={(e)=>changeProduct(e, elem)} name='stars' placeholder='stars' type="text"/>
                                    <input value={elem.month}  onChange={(e)=>changeProduct(e, elem)} name='month' placeholder='month' type="text"/>
                                    <input value={elem.priceOfMonth}  onChange={(e)=>changeProduct(e, elem)} name='priceOfMonth' placeholder='priceOfMonth' type="text"/>
                                    <input value={elem.oldPrice}  onChange={(e)=>changeProduct(e, elem)} name='oldPrice' placeholder='oldPrice' type="text"/>
                                    <input value={elem.hashteg}  onChange={(e)=>changeProduct(e, elem)} name='hashteg' placeholder='hashteg' type="text"/>
                                    <input value={elem.codeOfProduct}  onChange={(e)=>changeProduct(e, elem)} name='codeOfProduct' placeholder='codeOfProduct' type="text"/>
                                    theBestProduct<input value={elem.theBestProduct}  onChange={(e)=>changeProduct(e, elem)} name='theBestProduct' defaultChecked={!!elem.theBestProduct} type="checkbox"/>
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