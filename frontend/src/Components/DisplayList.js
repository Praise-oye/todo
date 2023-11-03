import React from "react";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import bootstrap component
import Button from "react-bootstrap/Button";

// Import custom stylesheet
import "../App.css";

// Function to display list of items for the currently logged in user
function DisplayList(props) {
  let displayItems;
  if (props.listItems.length > 0) {
    // Make variables easier to deal with - shorter names
    let data = props.listItems;
    let idData = props.idArray;
    let userData = props.userArray;

    let arrayData = data.split(",");
    let arrayId = idData.split(",");
    let arrayUser = userData.split(",");

    let thisUserItems = [];
    let thisUserIds = [];
    displayItems = [];

    // ---------------------------------------------- //

    // Loop to add only the list items belonging to the currently logged in user to an array
    for (let i = 0; i <= arrayData.length - 1; i++) {
      if (arrayUser[i] === props.currentUser) {
        thisUserItems.push(arrayData[i]);
        thisUserIds.push(arrayId[i]);
      }
    }

    /* For loop to populate an array with divs for each list item - includes "delete" button for each item. Delete button passes id of list item along to handler function so it can delete the correct item from the
   db */
    for (let i = 0; i <= thisUserItems.length - 1; i++) {
      displayItems.push(
        <div className="listItemDiv" key={i}>
          {i + 1}.&nbsp; {thisUserItems[i]}{" "}
          <Button
            variant="danger"
            onClick={() => props.handleDeleteItem(thisUserIds[i])}
          >
            X
          </Button>
        </div>
      );
    }

    // Display message if user has no list items stored yet
    if (displayItems.length === 0) {
      displayItems.push(<div className="redDiv">No items saved yet.</div>);
    }
  } else {
    displayItems = <p>No items loaded yet.</p>;
  }

  return (
    <div className="list">
      <p className="bold">List items</p>
      {displayItems}
    </div>
  );
}

// Export component
export default DisplayList;
