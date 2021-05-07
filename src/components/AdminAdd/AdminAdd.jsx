import React, { Component } from 'react'
import AdminPanel from '../AdminPanel/AdminPanel'
import "../AdminPanel/AdminPanel.css"
import AddProductModal from './AddProductModal'

export class AdminAdd extends Component {
    render() {
        return (
            <>
            <div className = "admin-header-black"></div>
            <div className = "admin-page-main">
                <AdminPanel />
            <div className = "admin-another-page">
               <div className = "archive-trash">
                <div className = "archive-elements">
                    <h4></h4>
                    <div className = "archive-icon">
                        <h4>Արխիվ</h4>
                        <i class="fa fa-archive" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
                <div className = "admin-add-section">
                    <div className = "admin-static-add">
                        <div className = "admin-add-image">
                            <img src = "./images/admin-add.svg" />
                        </div>
                        <div className = "admin-add-btn">
                            <i className = "fa fa-plus"></i>
                            <button>
                                <AddProductModal />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           </div>
            </>
        )
    }
}

export default AdminAdd
