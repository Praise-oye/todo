import React from "react";

// Import Bootstrap components
import { Form, FormControl, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

/* Function to display form to add items to to do list */
function ListForm(props) {
  return (
    <div className="form">
      <p className="bold">Add an item to your list</p>
      <Form>
        <div className="form-group">
          <FormLabel> Add Item: </FormLabel>
          <FormControl
            type="text"
            className="addItemInput"
            name="toAdd"
            placeholder="Add..."
            onChange={props.handleItemToAdd}
          />{" "}
          <Button variant="primary" onClick={props.handleAddItem}>
            Add item
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Export component so it can be used by App.js
export default ListForm;
