import React, { Component } from 'react'
import { io } from 'socket.io-client';

var socket = io('ws://localhost:8080')
class SocketTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            gotMessage: []
        }
    }

    componentDidMount() {
        socket.on('message', text => {
            this.setState({ gotMessage: [...this.state.gotMessage, text] })
        })

    }
    sendMessage = (e) => {
        e.preventDefault()
        socket.emit('message', this.state.message)
        this.setState({ message: '' })
    }
    render() {
        console.log(this.state.gotMessage)
        return (
            <div>
                <h2>socket test</h2>
                {this.state.gotMessage && this.state.gotMessage.map(message => (

                    <p>{message}</p>
                )
                )}
                <label>Message</label>
                <input type='text' onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message} />
                <button onClick={this.sendMessage}>Send</button>

            </div>
        )
    }
}

export default SocketTest
