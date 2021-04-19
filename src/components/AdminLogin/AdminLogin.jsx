import React, { useState, useEffect, memo, FC} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../AxiosPost/AxiosPost';
import { AdminToken } from './AdminToken.js';
import "./AdminLogin.css"

let  AdminLogin = () =>{
    const dispatch = useDispatch();
    const history = useHistory()    
    const [state, setState] = useState({
        LoginEmail:'admin@gmail.com',
        LoginPassword:'hhs13516'
    });
    const [load, setload] = useState(false);
    const changeValue = (e) => {
        setState({
            ...state,
            [e.target.id]:e.target.value
        })
    }
    const AutoLogin =async () =>{
        if(AdminToken.getToken()){
            setload(true)
            const res = await axios.post('/tokenverify',{token:AdminToken.getToken()})
            if(res.data.message !== 'ok'){
                console.log(res.data.message)
                setload(false)
                return 
            }
            dispatch({type:'ADMINLOGIN',payload:'admin'})
            history.push('/admin')
            setload(false)
        }
    }
    useEffect(() => {
        AutoLogin()
    }, []);
    const AdminLogin = async () => {
        setload(true)
        const res = await axios.post('/adminlogin',state)
        if(res.data.message !== 'ok'){
            setload(false)
            return 
        }
        AdminToken.setToken(res.data.token)
        dispatch({type:'ADMINLOGIN',payload:'admin'})
        history.push('/admin')
    }
 
    return (
        <>
            <section className='login'>
                <div className="login-center">
                    <h1>Please Sign in</h1>
                    <hr/>
                    <div className = "login-form-group">
                        <div className="email-input">
                            <label htmlFor="email">Email</label>
                            <input className = "login-input" id='LoginEmail' placeholder="Enter your email" value={state.LoginEmail} onChange={changeValue} type="text"/>
                        </div>
                        <label htmlFor="password">Password</label>
                        <input className = "login-input" id='LoginPassword' placeholder='Enter you password' value={state.LoginPassword} onChange={changeValue} type="text"/>
                        <button onClick={AdminLogin} type="button" className="login-btn">login</button>
                    </div>
                </div>
            </section>
        </>
    )
}


export default AdminLogin = memo(AdminLogin);
        