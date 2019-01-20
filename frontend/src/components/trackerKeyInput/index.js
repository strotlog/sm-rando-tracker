import React, { Component } from 'react'

class TrackerKeyInput extends React.Component {
    constructor(props) {
      super(props);

      let defaultTrackerKey = ""
      if (this.props.trackerKey !== undefined) {
        defaultTrackerKey = this.props.trackerKey
      }

      this.state = {
        connected: false,
        trackerKey: defaultTrackerKey
      }
      
      this.handleChange = this.handleChange.bind(this);
      this.handleTrackerKeyChange = this.handleTrackerKeyChange.bind(this);
    }
  
    handleChange(e) {
      this.props.onConnect(this.state.trackerKey);
      this.setState({connected: true})
    }

    handleTrackerKeyChange(e) {
       this.setState({trackerKey: e.target.value});
    }

    render() {
      return (
        <fieldset>
          <legend>Enter Tracker Key:</legend>
          <input disabled={this.state.connected} onChange={this.handleTrackerKeyChange} value={this.state.trackerKey}/>
          <button className={'trackerNameButton'} onClick={this.handleChange} disabled={this.state.connected}> Connect </button>
        </fieldset>
      );
    }
  }
  
export default TrackerKeyInput