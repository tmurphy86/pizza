import React, { Component, Fragment } from "react";
import {
  Button,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
} from "reactstrap";

class SideCard extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <UncontrolledAlert color="primary" className="d-none d-lg-block">
          <strong>Recommended for you!</strong>
          <br />
          <Fragment>
            <b>Product Name</b>
            <br></br>
            This is a placeholder for a product description
            <br></br>
            <Button color="success">Add this to Order</Button>
          </Fragment>
        </UncontrolledAlert>

        <Card>
          <CardBody>
            <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">
              Your Current Cart
            </CardTitle>
            <CardSubtitle
              className="text-secondary mb-2 font-weight-light text-uppercase"
              style={{ fontSize: "0.8rem" }}
            >
              Total: $0.00
            </CardSubtitle>
            <div
              className="text-secondary mb-4"
              style={{ fontSize: "0.75rem" }}
            >
              <Container>
                <Row className="font-weight-bold">
                  <Col>Item Name</Col>
                  <Col>Options</Col>
                  <Col>Price</Col>
                </Row>
              </Container>
            </div>
            <Button color="success" className="font-weight-bold">
              Checkout
            </Button>
          </CardBody>
        </Card>

        <br />
        <Button color="info">Chat to Order!</Button>
      </Fragment>
    );
  }
}

export default SideCard;
