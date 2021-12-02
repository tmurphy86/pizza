import React, { Fragment, Component } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Header from "./components/header";
import SideCard from "./components/sideCard";
import Stores from "./components/stores";
import Amplify, { Auth, Hub } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const signUpConfig = {
  header: "Welcome!",
  signUpFields: [
    {
      label: "First Name",
      key: "given_name",
      placeholder: "First Name",
      required: true,
      displayOrder: 5,
    },
    {
      label: "Last Name",
      key: "family_name",
      placeholder: "Last Name",
      required: true,
      displayOrder: 6,
    },
    {
      label: "Address",
      key: "address",
      placeholder: "Address",
      required: true,
      displayOrder: 7,
    },
  ],
};

class App extends Component {
  state = {
    showType: "",
    loggedIn: false,
    currentUser: null,
  };

  loadCurrentUser() {
    Auth.currentAuthenticatedUser().then((userInfo) => {
      this.setState({
        loggedIn: true,
        currentUser: userInfo.username,
        currentUserData: userInfo,
      });
    });
  }
  componentDidMount = () => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({
            currentUser: data.username,
            currentUserData: data,
            loggedIn: true,
          });
          break;
        case "signOut":
          this.setState({
            currentUser: null,
            loggedIn: false,
          });
          break;
        default:
          break;
      }
    });
    this.loadCurrentUser();
  };

  handleLogin = () => {
    this.setState({
      showType: "login",
    });
  };

  handleLogout = () => {
    this.setState({
      showType: "login",
    });
  };

  handleStores = () => {
    this.setState({
      showType: "stores",
    });
  };

  render() {
    return (
      <Fragment>
        <Header
          onHandleLogin={this.handleLogin}
          onHandleLogout={this.handleLogout}
          loggedIn={this.state.loggedIn}
          userName={this.state.currentUser}
        />
        <div className="my-5 py-5">
          <Container className="px-0">
            <Row
              noGutters
              className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative"
            >
              <Col
                xs={{ order: 2 }}
                md={{ size: 4, order: 1 }}
                tag="aside"
                className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0"
              >
                <SideCard />
              </Col>

              <Col
                xs={{ order: 1 }}
                md={{ size: 7, offset: 1 }}
                tag="section"
                className="py-5 mb-5 py-md-0 mb-md-0"
              >
                {this.state.showType === "" ? "This is the main content" : null}
                {this.state.showType === "stores" ? <Stores /> : null}
                {this.state.showType === "login" ? (
                  <AmplifyAuthenticator signUpConfig={signUpConfig}>
                    <div>
                      You are logged in.
                      <AmplifySignOut />
                    </div>
                  </AmplifyAuthenticator>
                ) : null}
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default App;
