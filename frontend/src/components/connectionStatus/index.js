import React from 'react'

class ConnectionStatus extends React.Component {
    render() {
        return (
            <div>
            {this.props.connected ? "connected" : "disconnected"}
            </div>
        )
    }
}

export default ConnectionStatus