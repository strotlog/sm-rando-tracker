import React from 'react';
import ReactQueryParams from 'react-query-params';
import './App.css';
import './items.css';

import TrackerKeyInput from   './components/trackerKeyInput'
import Tracker from           './components/tracker'
// import ConnectionStatus from  './components/connectionStatus'

const webSocketLocation = 'wss://sm-rando-tracker.onrender.com/api'
// const webSocketLocation = 'wss://sm-rando-tracker-staging.herokuapp.com/api'
// const webSocketLocation = 'ws://localhost:3000/api'
// const webSocketLocation = 'ws://localhost:1337'


const itemListStandard = [

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
  
    
    // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
    // {itemIcon:"./items/grappling.png", itemName:"grappling", startingState:false, collectionSlot:    1 << 19},  
    {itemIcon:"./items/crocomire.png", itemName:"crocomire", startingState:false, collectionSlot:    1 << 19},  
    {itemIcon:"./items/kraid.png", itemName:"kraid", startingState:true, collectionSlot:             1 << 15},
    {itemIcon:"./items/phantoon.png", itemName:"phantoon", startingState:true,  collectionSlot:      1 << 16},
    {itemIcon:"./items/draygon.png", itemName:"draygon", startingState:true,  collectionSlot:        1 << 17},
    {itemIcon:"./items/shaktool.gif", itemName:"shaktool", startingState:false, collectionSlot:      1 << 6},  
    // {itemIcon:"./items/xray.png", itemName:"xray", startingState:false, collectionSlot:              1 << 6},  
    
    //Usable in case we want an empty spot
    // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
  ]

  const itemListArea = [

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
    
      
      // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
      {itemIcon:"./items/grappling.png", itemName:"grappling", startingState:false, collectionSlot:    1 << 19},  
      // {itemIcon:"./items/crocomire.png", itemName:"crocomire", startingState:false, collectionSlot:    1 << 19},  
      {itemIcon:"./items/kraid.png", itemName:"kraid", startingState:true, collectionSlot:             1 << 15},
      {itemIcon:"./items/phantoon.png", itemName:"phantoon", startingState:true,  collectionSlot:      1 << 16},
      {itemIcon:"./items/draygon.png", itemName:"draygon", startingState:true,  collectionSlot:        1 << 17},
      // {itemIcon:"./items/shaktool.gif", itemName:"shaktool", startingState:false, collectionSlot:      1 << 6},  
      {itemIcon:"./items/xray.png", itemName:"xray", startingState:false, collectionSlot:              1 << 6},  
      
      //Usable in case we want an empty spot
      // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
    ]

const itemListChozo = [

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

  
  // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
  {itemIcon:"./items/grappling.png", itemName:"grappling", startingState:false, collectionSlot:    1 << 19},  
  {itemIcon:"./items/kraid.png", itemName:"kraid", startingState:true, collectionSlot:             1 << 15},
  {itemIcon:"./items/phantoon.png", itemName:"phantoon", startingState:true,  collectionSlot:      1 << 16},
  {itemIcon:"./items/draygon.png", itemName:"draygon", startingState:true,  collectionSlot:        1 << 17},
  {itemIcon:"./items/xray.png", itemName:"xray", startingState:false, collectionSlot:              1 << 6},  

  {itemIcon:"./items/missile.png", itemName:"missile1", startingState:false, collectionSlot:       1 << 21},
  {itemIcon:"./items/super.png", itemName:"super1", startingState:false, collectionSlot:           1 << 23},
  {itemIcon:"./items/pbomb.png", itemName:"pbomb", startingState:false, collectionSlot:            1 << 24},
  {itemIcon:"./items/super.png", itemName:"super1", startingState:false, collectionSlot:           1 << 27},
  {itemIcon:"./items/missile.png", itemName:"missile2", startingState:false, collectionSlot:       1 << 22},

  
  {itemIcon:"./items/etank.png", itemName:"etank1", startingState:false, collectionSlot:           1 << 28},
  {itemIcon:"./items/etank.png", itemName:"etank2", startingState:false, collectionSlot:           1 << 29},
  {itemIcon:"./items/etank.png", itemName:"etank3", startingState:false, collectionSlot:           1 << 30},
  {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:                0},  
  {itemIcon:"./items/reserve.png", itemName:"reserve", startingState:false, collectionSlot:        1 << 26},


  
  //Usable in case we want an empty spot
  // {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},  
]

const STANDARD = 1;
const RESTREAM = 2;
const CHOZO = 3;
const AREA = 4;

const InstructionComponent = (props) => {
  return (
    <div>
      <fieldset>
        <legend>Instructions:</legend>
        <div className="instructions">
             Enter your tracker key above, click connect.<br></br>
            Add a website capture to your restream, one per runner<br></br>
            send the url of the tracker (including the ?trackerKey parameter) to your loyal trackers<br></br>
            any changes they make should be reflected in your restreamed tracker<br></br>
            if the restreamed tracker isn't showing up, click hide all the trackers, and then wait a few seconds, and show them.  This will refresh the page the restream is using.
          </div>
      </fieldset>
    </div>
  );
}

class App extends ReactQueryParams  {

  constructor(props) {
    super(props)
    let trackerKeyParam = this.queryParams.trackerKey;
    let restreamPlayerParam = this.queryParams.restreamedPlayer

    let trackerTypeParam = this.queryParams.trackerType
    

    var itemList = itemListStandard;
    var trackerTypeInt;
    if (trackerTypeParam !== undefined) {
      trackerTypeInt = parseInt(trackerTypeParam)
      if (trackerTypeInt === CHOZO){
          itemList = itemListChozo
      } else if (trackerTypeInt === AREA){
          itemList = itemListArea
      }
    } else {
        trackerTypeInt = STANDARD
    }

    this.state = {
      socket: undefined,
      playerInventory: [0,0,0,0],
      trackerKey: trackerKeyParam,
      displayMode: STANDARD,
      trackerType: trackerTypeInt,
      restreamPlayer: 0,
      itemList: itemList
    }
    
    this.updateInventory = this.updateInventory.bind(this);
    this.connectToWebsocket = this.connectToWebsocket.bind(this);
    this.clearInventories = this.clearInventories.bind(this);
    this.connectToNewTrackerKey = this.connectToNewTrackerKey.bind(this);
    this.simulateWebSocketDc = this.simulateWebSocketDc.bind(this)
    this.addPlayer = this.addPlayer.bind(this);
    
    this.switchToChozo = this.switchToChozo.bind(this)
    this.switchToStandard = this.switchToStandard.bind(this)
    this.switchToArea = this.switchToArea.bind(this)

    if (trackerKeyParam !== undefined) {
        let trackerWebsocket = this.connectToWebsocket(trackerKeyParam)
        this.state.socket = trackerWebsocket
    }

    if (restreamPlayerParam !== undefined) {
      this.state.displayMode = RESTREAM;
      this.state.restreamPlayer = parseInt(restreamPlayerParam);
    }
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

    if (this.state.socket !== null && this.state.socket !== undefined && this.state.socket.readyState === this.state.socket.OPEN) {
      //do nothing already connected    
      return this.state.socket;
    }

    let trackerWebsocket = new WebSocket(webSocketLocation)
    trackerWebsocket.onopen = () => {
      trackerWebsocket.send(newTrackerKey)
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = undefined
      }
    }

    trackerWebsocket.onmessage = (message) => {
      
      let inv = message.data.split(",").map((element) => {
        return parseInt(element)
      });

      this.setState(prevState => ({
        playerInventory: inv
      }))
    }

    trackerWebsocket.onclose = (event) => {
      if(!this.timerId){
        this.setState({socket: null})
        this.timerId =  setInterval(() => {
          let newWs = this.connectToWebsocket(newTrackerKey)
          this.setState({socket: newWs})
        }, 5000)
      }
    }


    return trackerWebsocket;
  }

  updateInventory(playerIndex, item, value) {
    if (this.state.socket === undefined || this.state.socket === null) {
      return;
    }

    if (this.state.socket.readyState !== this.state.socket.OPEN) {
      //If we DC'd then reconnect.  we won't be able to update the item right away, but this will at least reconnect us.
      // this.connectToNewTrackerKey(this.state.trackerKey)
      console.log("Websocket is not in a ready state: " + this.state.socket.readyState)
      return;
    }
    this.state.socket.send('{"player":' + playerIndex + ',"item":' + item + '}')
  }

  simulateWebSocketDc() {
    this.state.socket.close()
  }

  switchToChozo() {
    this.setState({
      itemList: itemListChozo,
      trackerType: CHOZO
    })
    this.setQueryParams({ trackerType:CHOZO });
  }

  switchToArea() {
    this.setState({
      itemList: itemListArea,
      trackerType: AREA
    })
    this.setQueryParams({ trackerType:AREA });
  }

  switchToStandard() {
    this.setState({
      itemList: itemListStandard,
      trackerType: STANDARD
    })
    this.setQueryParams({ trackerType:STANDARD });

  }

  render() {
    return (
      <div className="App">
        <header className={this.state.displayMode === STANDARD? "App-header" : "App-header single-player"}>

        {this.state.displayMode === STANDARD ? <TrackerKeyInput onConnect={this.connectToNewTrackerKey} trackerKey={this.state.trackerKey}/> : null}
          {/* This will display the connection status, hopefully we don't need it. */}
          {/* <ConnectionStatus connected={this.state.socket !== undefined && this.state.socket.readyState === this.state.socket.OPEN}/> */}
          <div className="allTrackers">
            {this.state.playerInventory.map((inventory, i) =>    
                <Tracker 
                    key={i} 
                    itemList={this.state.itemList} 
                    trackerTitle={"Player " + (i+1)} 
                    playerIndex={i} 
                    inventory={inventory} 
                    updateInventory={this.updateInventory} 
                    restreamPlayer={this.state.restreamPlayer} 
                    displayMode={this.state.displayMode} 
                    trackerKey={this.state.trackerKey}
                    trackerType={this.state.trackerType}
                    />                
              )}            
          </div> 
          {this.state.displayMode === STANDARD && this.state.trackerKey !== undefined ? <button onClick={this.clearInventories}>Clear Inventories</button> : null }
          {this.state.displayMode === STANDARD && this.state.trackerType === CHOZO ? <button onClick={this.switchToArea}>Switch to Area Rando</button> : null}          
          {this.state.displayMode === STANDARD && this.state.trackerType === AREA ? <button onClick={this.switchToStandard}>Switch to Standard Rando</button> : null}
          {this.state.displayMode === STANDARD && this.state.trackerType === STANDARD ? <button onClick={this.switchToChozo}>Switch to Chozo Rando</button> : null}

          {/* NYI - might be nice to be able to add more trackers */}
          {/* <button onClick={this.addPlayer}>Add Player</button> */}

          {/* I use this button to test the websocket disconnecting */}
          {/* <button onClick={this.simulateWebSocketDc}>Disconnect!</button> */}
          {this.state.displayMode === STANDARD ? <InstructionComponent /> : null}
          
        </header>
      </div>
    );
  }
}

export default App;
