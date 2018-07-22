import React, {Component} from "react";
import {Header, Button, Form, Segment} from "semantic-ui-react"
import {createContractFromTemplate} from "./smart_contracts/basic_vesting_template";


class ContractGenerator extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  render() {
    const {startingDate, originalAssetAmount, assetId, ownerPk, maxVestingPeriodWeeks, cliffPeriodWeeks} = this.state
    const contractScript = createContractFromTemplate(this.state)
    return (
      <div className="Contract-generator">
        <Header> Generate a vesting smart contract for an account </Header>
        <Segment inverted>
          <Form inverted>
            <Form.Group>
              <Form.Input placeholder='Owner PK' name='ownerPk' value={ownerPk}
                          onChange={this.handleChange}/>
              <Form.Input placeholder='Starting UNIX timestamp' name='startingDate'
                          value={startingDate} onChange={this.handleChange}/>
              <Form.Input placeholder='Starting asset amount' name='originalAssetAmount' value={originalAssetAmount}
                          onChange={this.handleChange}/>
              <Form.Input placeholder='Asset ID' name='assetId' value={assetId} onChange={this.handleChange}/>
              <Form.Input placeholder='Maximum weeks vesting' name='maxVestingPeriodWeeks' value={maxVestingPeriodWeeks}
                          onChange={this.handleChange}/>
              <Form.Input placeholder='Cliff (weeks)' name='cliffPeriodWeeks' value={cliffPeriodWeeks}
                          onChange={this.handleChange}/>
            </Form.Group>
            <Segment className={"Smart-contract-build"}>
              {contractScript}
            </Segment>
          </Form>
        </Segment>

      </div>
    );
  }
}

export default ContractGenerator;
