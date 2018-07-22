import React, {Component} from "react";
import ContractGenerator from "./ContractGenerator"
import {Grid} from 'semantic-ui-react'
import "./App.css";

class App extends Component {
  render() {
    return (
      <Grid container className="App">
        <header className="App-header">
        </header>
        <Grid className="App-intro" >


          <ContractGenerator/>
        </Grid>
      </Grid>
    );
  }
}

export default App;
