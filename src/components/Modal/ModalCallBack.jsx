import React, { Component } from 'react'
import {Button, Modal} from "react-bootstrap"

class ModalFooter extends Component {
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
                <Button className = "btn btn-dark" onClick = {() => {this.handleModal()}}>ՀԵՏԱԴԱՐՁ ԿԱՊ</Button>
                <Modal show = {this.state.show}>
                    <Modal.Body>
                        Hi , text text
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

export default ModalFooter
