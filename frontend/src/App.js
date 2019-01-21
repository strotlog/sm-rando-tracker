import React, { Component } from 'react';
import logo from './logo.svg';
import ReactQueryParams from 'react-query-params';
import './App.css';
import './items.css';

import TrackerKeyInput from './components/trackerKeyInput'
import Tracker from './components/tracker'

const webSocketLocation = 'wss://sm-rando-tracker.herokuapp.com/api'
// const webSocketLocation = 'ws://localhost:3000/api'

const itemList = [

  
  {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},
  {itemIcon:"./items/kraid.png", itemName:"kraid", startingState:true, collectionSlot:             1 << 15},
  {itemIcon:"./items/phantoon.png", itemName:"phantoon", startingState:true,  collectionSlot:      1 << 16},
  {itemIcon:"./items/draygon.png", itemName:"draygon", startingState:true,  collectionSlot:        1 << 17},
  {itemIcon:"./items/ridley.png", itemName:"ridley", startingState:true,  collectionSlot:          1 << 18},

  
  {itemIcon:"./items/morph.png", itemName:"morph", startingState:false, collectionSlot:            1 << 14},
  {itemIcon:"./items/varia.png", itemName:"varia", startingState:false, collectionSlot:            1 << 12},  
  {itemIcon:"./items/springball.png", itemName:"springball", startingState:false, collectionSlot:  1 << 11},
  {itemIcon:"./items/hijump.png", itemName:"hijump", startingState:false, collectionSlot:          1 << 7},
  {itemIcon:"./items/space.png", itemName:"space", startingState:false, collectionSlot:            1 << 9},



  {itemIcon:"./items/bomb.png", itemName:"bombs", startingState:false, collectionSlot:             1 << 5},
  {itemIcon:"./items/gravity.png", itemName:"gravity", startingState:false, collectionSlot:        1 << 13},  
  {itemIcon:"./items/spacer.png", itemName:"spacer", startingState:false, collectionSlot:    0},
  {itemIcon:"./items/speed.png", itemName:"speed", startingState:false, collectionSlot:            1 << 10},
  {itemIcon:"./items/screw.png", itemName:"screw", startingState:false, collectionSlot:            1 << 8},

  {itemIcon:"./items/charge.png", itemName:"charge", startingState:false, collectionSlot:          1 << 0},
  {itemIcon:"./items/ice.png", itemName:"ice", startingState:false, collectionSlot:                1 << 1},
  {itemIcon:"./items/wave.png", itemName:"wave", startingState:false, collectionSlot:              1 << 2},
  {itemIcon:"./items/spazer.png", itemName:"spazer", startingState:false, collectionSlot:          1 << 3},
  {itemIcon:"./items/plasma.png", itemName:"plasma", startingState:false, collectionSlot:          1 << 4},  
  
  
  // {itemIcon:"./items/grappling.png", itemName:"grappling", startingState:false, collectionSlot:    1 << 6},

  
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
    this.addPlayer = this.addPlayer.bind(this);

    if (trackerKeyParam !== undefined) {
      let trackerWebsocket = new WebSocket(webSocketLocation)
      trackerWebsocket.onopen = () => {        
        console.log("Connected!")
        trackerWebsocket.send(trackerKeyParam)
      }
      trackerWebsocket.onmessage = (message) => {
        
        let inv = message.data.split(",").map((element) => {
          return parseInt(element)
        });;

        this.setState(prevState => ({
          playerInventory: inv
        }))
      }

      this.state.socket = trackerWebsocket
    }

  }
 
  clearInventories() {
    
    this.state.playerInventory.map((inventory, playerIndex) => {
      this.state.socket.send('{"player":' + playerIndex + ',"item":' + inventory + '}')
    })
  }

  addPlayer() {
    this.updateInventory(this.state.playerInventory.length, 1, true)
  }

  connectToWebsocket(newTrackerKey){

    if (this.state.socket !== undefined) {
      //do nothing already connected
      return
    }

    console.log("connecting to " + newTrackerKey)
    let trackerWebsocket = new WebSocket(webSocketLocation)
    trackerWebsocket.onopen = () => {
      console.log("Connected!")
      trackerWebsocket.send(newTrackerKey)
    }
    trackerWebsocket.onmessage = (message) => {
      
      let inv = message.data.split(",").map((element) => {
        return parseInt(element)
      });;

      this.setState(prevState => ({
        playerInventory: inv
      }))
    }

    this.setState({
      trackerKey: newTrackerKey,
      socket: trackerWebsocket
    })
    
  }

  updateInventory(playerIndex, item, value) {
    if (this.state.socket === undefined) {
      return;
    }
    this.state.socket.send('{"player":' + playerIndex + ',"item":' + item + '}')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TrackerKeyInput onConnect={this.connectToWebsocket} trackerKey={this.state.trackerKey}/>
          <div className="allTrackers">
            {this.state.playerInventory.map((inventory, i) =>
               <div key={i} className="trackerContainer">              
                <Tracker key={i} itemList={itemList} trackerTitle={"Player " + (i+1)} playerIndex={i} inventory={inventory} updateInventory={this.updateInventory}/> 
               </div>
              )}            
          </div> 
          <button onClick={this.clearInventories}>Clear Inventories</button>
          {/* <button onClick={this.addPlayer}>Add Player</button> */}
        </header>
      </div>
    );
  }
}

export default App;
