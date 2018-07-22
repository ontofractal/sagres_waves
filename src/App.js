import React, {Component} from "react";
import ContractGenerator from "./ContractGenerator"
import {Grid, Menu, Dropdown, Container, Image} from "semantic-ui-react"
import cliffLogo from "./cliff_logo.png"
import "./App.css";

class App extends Component {
  render() {
    return (
      <Grid container className="App">
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src={cliffLogo} style={{marginRight: "1.5em"}}/>
              Sagres
            </Menu.Item>
            <Menu.Item>
              Smart contracts for WAVES blockchain
            </Menu.Item>
            <Menu.Item position={"right"} as='a' href={"http://twitter.com/ontofractal"}>built by
              @ontofractal</Menu.Item>
          </Container>
        </Menu>

        <ContractGenerator/>
      </Grid>
    );
  }
}

export default App;
