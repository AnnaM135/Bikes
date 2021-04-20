import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"

class ModalRules extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             show: false
        }
    }
    handleModal(){
        this.setState({
            show: !this.state.show
        })
    }
    
    render() {
        return (
            <div>
                <Button className = "btn btn-dark" onClick = {() => {this.handleModal()}}>ՊԱՅՄԱՆՆԵՐ և ԿԱՆՈՆՆԵՐ</Button>
                <Modal show = {this.state.show}>
                    <Modal.Body>
                        Hi , text textdfghyh
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className = "btn btn-danger" onClick = {() => {this.handleModal()}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalRules
