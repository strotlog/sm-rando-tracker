import React, { Component } from 'react'

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collected: props.collected,
            itemIcon: props.itemIcon,
            itemName: props.itemName,
            collectionSlot: props.collectionSlot
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onItemToggle(this.props.collectionSlot, !this.props.collected)
    }

    render() {
        return (
            <div className="item" onClick={this.handleClick}>
                <img className={this.props.collected?"item-image collected":"item-image"} src={this.state.itemIcon} alt={this.state.itemName} />
            </div>
        )
    }
}

export default Item