// Import React Bootstrap components
// Import bootstrap styles
// Import custom stylesheet

import React from "react";
import Button from "react-bootstrap/Button";
import { Form, FormControl, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// Function to display login form in header. Uses React bootstrap
function LoginForm(props) {
  return (
    <div className="loginFormDiv">
      {/* Learned how to turn autocomplete off here: 
      https://reactgo.com/react-turn-off-autocomplete/ */}
      <Form id="loginForm" autoComplete="off" className="loginForm">
        <Row>
          <Col className="col-4">
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter username"
              onChange={props.handleUsername}
            />{" "}
          </Col>
          <Col className="col-4">
            <FormControl
              type="text"
              name="toAdd"
              placeholder="Enter password"
              onChange={props.handlePassword}
            />{" "}
          </Col>
          <Col className="col-2">
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={props.handleLogin}
            >
              Login
            </Button>
          </Col>
          <Col className="col-2">
            <Button
              className="buttons"
              variant="primary"
              type="button"
              onClick={props.handleRegister}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Form>

      {/* End of loginFormDiv*/}
    </div>

    // End of return
  );

  // End of loginform function
}

// Export component so it can be used by other components
export default LoginForm;
