import React, { Component } from 'react'
import "../AdminPanel/AdminPanel.css"

export class AdminAdd extends Component {
    render() {
        return (
            <div>
              
                <div className = "admin-add-section">
                    <div className = "admin-static-add">
                        <div className = "admin-add-image">
                            <img src = "./images/admin-add.svg" />
                        </div>
                        <div className = "admin-add-btn">
                            <i className = "fa fa-plus"></i>
                            <button>Ավելացնել</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminAdd
