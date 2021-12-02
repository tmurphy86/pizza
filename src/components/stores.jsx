import React, { Component, Fragment  } from "react";
import API, { graphqlOperation } from '@aws-amplify/api';
import { Button, Container, Row, Col, Input } from "reactstrap";

class Stores extends Component {

        state = {
            isLoaded: false,
            allowed: false,
            storesData: null,
            currentStoreCode: "",
            currentName: "",
            currentCity: "",
            currentState: "",
            currentStoreCodeToDelete: "",
        }

 updateField(event) {
        var txtField = event.target.id;
        var txtValue = event.target.value;
        switch (txtField)
        {
            case "storeCode":
                this.setState( { currentStoreCode: txtValue });
                break;
            case "name":
                this.setState( { currentName: txtValue });
                break;
            case "city":
                this.setState( { currentCity: txtValue });
                break;
            case "state":
                this.setState( { currentState: txtValue });
                break;
            case "delStoreCode":
                this.setState( { currentStoreCodeToDelete: txtValue });
                break;
        }
  }

    deleteStore = () => {
      console.log("Removing Store")
      const apiName = 'storeInfoApi';
      const path = '/stores';
      const myInit = { // OPTIONAL
        headers: {
        }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        body: {
            "storeCode": this.state.currentStoreCodeToDelete
        }
      };
      API
        .del(apiName, path, myInit)
        .then(response => {
            console.log("Deleted: " + response)
            this.getLatestStores();
        })
        .catch(error => {
            console.log(error.response);
        });
    }


  updateStore = () => {
      console.log("Store updated")
    const apiName = 'storeInfoApi';
    const path = '/stores';
    const myInit = { // OPTIONAL
        headers: {
        }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        body: {
            "storeCode": this.state.currentStoreCode,
            "name": this.state.currentName,
            "city": this.state.currentCity,
            "state": this.state.currentState
        }
    };
      API
  .post(apiName, path, myInit)
  .then(response => {
    console.log("Posted: " + response)
    this.getLatestStores();
  })
  .catch(error => {
    console.log(error.response);
  });
  };

  getLatestStores() {

    const apiName = 'storeInfoApi';
    const path = '/stores';
    const myInit = { // OPTIONAL
        headers: {
        }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)

    };

    API.get(apiName, path, myInit)
  .then(response => {
      this.setState({allowed: true});
        console.log(response);
        this.setState({
            storesData: response.data
        });
  })
  .catch(error => {
      this.setState({allowed: false});
    console.log(error.response);
 });

  }

  componentDidMount() {
    console.log("Stores component loaded")
    this.getLatestStores();
  }

    render() {
    return (
      <Fragment>
       {this.state.allowed ?

       <Fragment>
        <b>Stores Administration</b>
        <Container>
          <Row className="font-weight-bold">
            <Col>Store Code</Col>
            <Col>Store Name</Col>
            <Col>City</Col>
          </Row>
          {this.state.storesData
            ? this.state.storesData.map(storeInfo => (
                <Row key={storeInfo.storeCode}>
                  <Col>{storeInfo.storeCode}</Col>
                  <Col>{storeInfo.name}</Col>
                  <Col>{storeInfo.city}, {storeInfo.state}</Col>
                </Row>
              ))
            : "NO CURRENT STORES"}
        </Container>
        <hr/>
        <br/>
        Store Code:
        <Input
                      type="text"
                      id="storeCode"
                      columns="10"
                      onChange={this.updateField.bind(this)}
                    ></Input>
        <br/>
        Store Name:
        <Input
                      type="text"
                      id="name"
                      cols="10"
                      onChange={this.updateField.bind(this)}
                    ></Input>
        <br/>
        City:
        <Input
                      type="text"
                      id="city"
                      cols="10"
                      onChange={this.updateField.bind(this)}
                    ></Input>
        <br/>
        State:
        <Input
                      type="text"
                      id="state"
                      cols="10"
                      onChange={this.updateField.bind(this)}
                    ></Input>
        <br/>
        <Button onClick={this.updateStore}>Add / Update Store Data</Button>
        <hr/>
        Delete a Store by Code:
        <Input
                      type="text"
                      id="delStoreCode"
                      cols="10"
                      onChange={this.updateField.bind(this)}
                    ></Input>
        <br/>
        <Button onClick={this.deleteStore}>Remove Store</Button>

      </Fragment>
       : "Not allowed to view stores data"}

        </Fragment>
)
}
}
export default Stores;
