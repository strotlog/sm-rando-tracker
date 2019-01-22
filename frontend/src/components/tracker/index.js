import React from 'react'
import Item from '../item'

class Tracker extends React.Component {
    
    constructor(props) {
        super(props);
        this.onItemToggle = this.onItemToggle.bind(this);
    }

    onItemToggle(item, value) {
        this.props.updateInventory(this.props.playerIndex, item, value);
    }

    render() {
        return (
            <div className="tracker">
                <div className="trackerTitle">{this.props.trackerTitle}</div>
                <div className="trackerBorder">
                    <div className="trackerItems">
                        {this.props.itemList.map((item, i) =>
                            <Item 
                            key={i} 
                            itemName={item.itemName} 
                            itemIcon={item.itemIcon}
                            collectionSlot={item.collectionSlot}
                            collected={(this.props.inventory & item.collectionSlot) > 0}
                            onItemToggle={this.onItemToggle}
                            startLit={item.startingState}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Tracker