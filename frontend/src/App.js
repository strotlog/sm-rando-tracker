import React from 'react';
import ReactQueryParams from 'react-query-params';
import './App.css';
import './items.css';

import TrackerKeyInput from   './components/trackerKeyInput'
import Tracker from           './components/tracker'
// import ConnectionStatus from  './components/connectionStatus'

const webSocketLocation = 'wss://sm-rando-tracker.herokuapp.com/api'
// const webSocketLocation = 'wss://sm-rando-tracker-staging.herokuapp.com/api'
// const webSocketLocation = 'ws://localhost:3000/api'

const itemList = [

//Items are displayed in the order of this list.  collectionSlot determines which bit the item uses
  {itemIcon:"./items/charge.png", itemName:"charge", startingState:false, collectionSlot:          1 << 0},
  {itemIcon:"./items/ice.png", itemName:"ice", startingState:false, collectionSlot:                1 << 1},
  {itemIcon:"./items/wave.png", itemName:"wave", startingState:false, collectionSlot:              1 << 2},
  {itemIcon:"./items/spazer.png", itemName:"spazer", startingState:false, collectionSlot:          1 << 3},
  {itemIcon:"./items/plasma.png", itemName:"plasma", startingState:false, collectionSlot:          1 << 4},  
  
  {itemIcon:"./items/morph.png", itemName:"morph", startingState:false, collectionSlot:            1 << 14},
  {itemIcon:"./items/varia.png", itemName:"varia", startingState:false, collectionSlot:            1 << 12},  
  {itemIcon:"./items/springball.png", itemName:"springball", startingState:false, collectionSlot:  1 << 11},
  {itemIcon:"./items/hijump.png", itemName:"hijump", startingState:false, collectionSlot:          1 << 7},
  {itemIcon:"./items/space.png", itemName:"space", startingState:false, collectionSlot:            1 << 9},

  {itemIcon:"./items/bomb.png", itemName:"bombs", startingState:false, collectionSlot:             1 << 5},
  {itemIcon:"./items/gravity.png", itemName:"gravity", startingState:false, collectionSlot:        1 << 13},    
  {itemIcon:"./items/ridley.png", itemName:"ridley", startingState:true,  collectionSlot:          1 << 18},
  {itemIcon:"./items/speed.png", itemName:"speed", startingState:false, collectionSlot:            1 << 10},
  {itemIcon:"./items/screw.png", itemName:"screw", startingState:false, collectionSlot:            1 << 8},

  {itemIcon:"./items/crocomire.png", itemName:"crocomire", startingState:false, collectionSlot:    1 << 19},
  {itemIcon:"./items/kraid.png", itemName:"kraid", startingState:true, collectionSlot:             1 << 15},
  {itemIcon:"./items/phantoon.png", itemName:"phantoon", startingState:true,  collectionSlot:      1 << 16},
  {itemIcon:"./items/draygon.png", itemName:"draygon", startingState:true,  collectionSlot:        1 << 17},
  {itemIcon:"./items/shaktool.gif", itemName:"shaktool", startingState:false, collectionSlot:      1 << 20},
  
  //Usable in case we want an empty spot
  // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
]


class App extends ReactQueryParams  {

  constructor(props) {
    super(props)
    let trackerKeyParam = this.queryParams.trackerKey;
    
    this.state = {
      socket: undefined,
      playerInventory: [0,0,0,0],
      trackerKey: trackerKeyParam
    }
    
    this.updateInventory = this.updateInventory.bind(this);
    this.connectToWebsocket = this.connectToWebsocket.bind(this);
    this.clearInventories = this.clearInventories.bind(this);
    this.connectToNewTrackerKey = this.connectToNewTrackerKey.bind(this);
    this.simulateWebSocketDc = this.simulateWebSocketDc.bind(this)
    this.checkWebSocketConnection = this.checkWebSocketConnection.bind(this)
    this.addPlayer = this.addPlayer.bind(this);

    if (trackerKeyParam !== undefined) {
        let trackerWebsocket = this.connectToWebsocket(trackerKeyParam)
        this.state.socket = trackerWebsocket
    }

    setInterval(this.checkWebSocketConnection, 5000);

  }
 
  checkWebSocketConnection() {
    if (this.state.trackerKey === undefined || (this.state.socket !== undefined && this.state.socket.readyState === this.state.socket.OPEN)) {
        //everything is a-ok!
        return;
    }

    //we've dropped, let's reconnect
    this.connectToNewTrackerKey(this.state.trackerKey);
  }

  clearInventories() {
    
    this.state.playerInventory.map((inventory, playerIndex) => {
      return this.state.socket.send('{"player":' + playerIndex + ',"item":' + inventory + '}')
    })
  }

  addPlayer() {
    this.updateInventory(this.state.playerInventory.length, 1, true)
  }

  connectToNewTrackerKey(newTrackerKey) {
    let trackerWebsocket = this.connectToWebsocket(newTrackerKey)

    this.setState({
      trackerKey: newTrackerKey,
      socket: trackerWebsocket
    })

    this.setQueryParams({ trackerKey:newTrackerKey });
  }

  connectToWebsocket(newTrackerKey){

    if (this.state.socket !== undefined && this.state.socket.readyState === this.state.socket.OPEN) {
      //do nothing already connected
      return
    }

    let trackerWebsocket = new WebSocket(webSocketLocation)
    trackerWebsocket.onopen = () => {
      trackerWebsocket.send(newTrackerKey)
    }

    trackerWebsocket.onmessage = (message) => {
      
      let inv = message.data.split(",").map((element) => {
        return parseInt(element)
      });

      this.setState(prevState => ({
        playerInventory: inv
      }))
    }


    return trackerWebsocket;
  }

  updateInventory(playerIndex, item, value) {
    if (this.state.socket === undefined) {
      return;
    }

    if (this.state.socket.readyState !== this.state.socket.OPEN) {
      //If we DC'd then reconnect.  we won't be able to update the item right away, but this will at least reconnect us.
      this.connectToNewTrackerKey(this.state.trackerKey)
      return;
    }
    this.state.socket.send('{"player":' + playerIndex + ',"item":' + item + '}')
  }

  simulateWebSocketDc() {
    this.state.socket.close()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TrackerKeyInput onConnect={this.connectToNewTrackerKey} trackerKey={this.state.trackerKey}/>
          {/* This will display the connection status, hopefully we don't need it. */}
          {/* <ConnectionStatus connected={this.state.socket !== undefined && this.state.socket.readyState === this.state.socket.OPEN}/> */}
          <div className="allTrackers">
            {this.state.playerInventory.map((inventory, i) =>
               <div key={i} className="trackerContainer">              
                <Tracker key={i} itemList={itemList} trackerTitle={"Player " + (i+1)} playerIndex={i} inventory={inventory} updateInventory={this.updateInventory}/> 
               </div>
              )}            
          </div> 
          <button onClick={this.clearInventories}>Clear Inventories</button>
          {/* NYI - might be nice to be able to add more trackers */}
          {/* <button onClick={this.addPlayer}>Add Player</button> */}

          {/* I use this button to test the websocket disconnecting */}
          {/* <button onClick={this.simulateWebSocketDc}>Disconnect!</button> */}

          <div>
            <fieldset>
              <legend>Instructions:</legend>
              <div className="instructions">
                Enter your tracker key above, click connect.<br></br>
                Add a website capture to your restream, one per runner<br></br>
                send the url of the tracker (including the ?trackerKey parameter) to your loyal trackers<br></br>
                any changes they make should be reflected in your restreamed tracker<br></br>
                </div>
            </fieldset>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
