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
        
        var className = "tracker";
        if (this.props.displayMode === 2) {
            if (this.props.restreamPlayer === this.props.playerIndex) {
                className = "restreamedTracker";    
            } else {
                className = "tracker hidden";
            }
        }
        return (
            <div className={className}>
                {this.props.displayMode === 1 ? <a href={"?restreamedPlayer=" + this.props.playerIndex + "&trackerKey=" + this.props.trackerKey} className="trackerTitle">{this.props.trackerTitle}</a> : null}
                <div className={this.props.displayMode === 1 ?"trackerBorder" : ""}>
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