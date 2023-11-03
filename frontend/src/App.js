import React from "react";

// Import custom stylesheet
import "./App.css";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import components
import ListForm from "./Components/ListForm";
import Header from "./Components/Header";
import DisplayList from "./Components/DisplayList";

// App component Display to do list
class App extends React.Component {
  constructor(props) {
    super(props);
    // Set initial state variables. Includes array to store to do list.
    this.state = {
      username: null,
      password: null,
      currentUser: null,
      users: [],
      pwords: [],
      token: "",
      isLoaded: false,
      items: [],
      idArray: [],
      userArray: [],
      item: null,
      itemToDelete: "",
      loggedIn: false,
      message: "",
      error: null,
    };

    // Binding to make "this" work correctly
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.getList = this.getList.bind(this);

    this.handleItemToAdd = this.handleItemToAdd.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);

    this.reloadList = this.reloadList.bind(this);
  }

  // Function to log user out when they click "logout" button in header
  handleLogout(event) {
    this.setState(
      {
        loggedIn: false,
        isLoaded: false,
        username: null,
        password: null,
        currentUser: null,
        item: null,
        token: null,
        message: null,
      },
      () => {
        console.log("User logged out.");
        this.reloadList();
      }
    );
  }

  // Add/save list item to state prior to storing in db
  handleItemToAdd(event) {
    let value = event.target.value;

    let trimmedItem = value.trim();
    this.setState({
      item: trimmedItem,
    });
  }

  // Functions to save username and password to state when user types them in to login form in header
  handleUsername(event) {
    let value = event.target.value;
    let user = value.trim();
    this.setState(
      {
        username: user,
      },
      () => {
        console.log("Username saved: " + this.state.username);
      }
    );
  }

  handlePassword(event) {
    let value = event.target.value;
    let pwd = value.trim();
    this.setState({
      password: pwd,
    });
  }
  // --------------------------------------------------------- //

  // Retrieve list items from db if token is valid
  getList() {
    if (this.state.message === "Success! Token valid.") {
      console.log("Get list has run");
      fetch("/getList")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items,
              idArray: result.id,
              userArray: result.user,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  /* Takes token created in "handleLogin" function and authenticates user */
  handleAuth() {
    let token = this.state.token;
    if (token !== undefined && token !== "Incorrect login!" && token !== null) {
      fetch("/resource", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                loggedIn: true,
                currentUser: result.currentUser,
                message: result.message,
                username: null,
                password: null,
              },
              () => {
                console.log(
                  "handleAuth has run. Welcome, " + this.state.currentUser
                );
                this.getList();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {

      document.forms["loginForm"].reset();
      alert("Incorrect login details. Please try again.");
      console.log("Invalid token. Not logged in.");

      this.reloadList();
    }
    // End of handleauth function
  }

  // Take user login details and create JWT token, then call "handleAuth" function to authenticate user
  handleLogin(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          users: this.state.users,
          pwords: this.state.pwords,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                token: result.message,
              },
              () => {
                console.log(
                  "Login details sent via post. Token is " + this.state.token
                );
                this.handleAuth();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your username and password, then click 'Login' again."
          );
          this.reloadList();
        }
      );
      // End of if statement to check that username and password fields are not empty
    }

    // End of handlelogin function
  }

  /* Register new user. Saves their login details to db and makes it so they can only access their own to do 
  list */
  handleRegister(event) {
    if (this.state.username !== null && this.state.password !== null) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: false,
              },
              () => {
                console.log("Registration details sent via post.");
                alert(
                  "New user, " +
                    this.state.username +
                    ", registered. Please log in."
                );
                this.reloadList();
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          console.log("Username and password fields blank.");
          alert(
            "Please enter your new username and password, then click 'Register' again."
          );
          this.reloadList();
        }
      );
      // End of if statement to check that state variables "username" and "password" are not null
    }
    // End of handleregister function
  }

  // Handler function to delete a list item from database when user clicks the little red cross
  handleDeleteItem(itemId) {
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              isLoaded: false,
            },
            () => {
              console.log(
                "Post request to delete list item sent. " + result.message
              );
              this.reloadList();
            }
          );
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
    // End of handledeleteitem function
  }

  // Handler function to add list item to database when user submits form
  handleAddItem() {
    if (this.state.item !== null) {
      fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: this.state.currentUser,
          item: this.state.item,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: false,
              },
              () => {
                console.log(
                  "Post request to add list item sent. " + result.message
                );
                this.reloadList();
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error,
            });
          }
        );
    } else {
      this.setState(
        {
          isLoaded: false,
        },
        () => {
          alert(
            "Form is blank. Please type in a list item to save, then click 'Add item' again."
          );
          this.reloadList();
        }
      );
      // End of if statement to check that user has not submitted empty form field
    }
    // End of handleadditem function
  }

  /* Function to reload list of items from database after a change (delete or add). It also retrieves logins from db and saves them to state */
  reloadList() {
    if (this.state.isLoaded === false) {
      console.log("Reload list has run.");

      // Retrieve usernames and passwords from database
      fetch("/getLogins")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                users: result.users,
                pwords: result.pwords,
                isLoaded: true,
              },
              () => {
                console.log("Logins retrieved from db.");
              }
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );

      this.getList();

      // End of if statement to check if list of items has been loaded yet.
    }
  }

  // Runs when page is first loaded. Retrieves to do list and logins from db and saves them to state
  componentDidMount() {
    // If statement to check if data has been fetched already or not. Won't run twice.
    if (this.state.isLoaded === false) {
      console.log("componentDidMount - Load list has run.");

      // Retrieve usernames and passwords from database
      fetch("/getLogins")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                users: result.users,
                pwords: result.pwords,
                isLoaded: true,
              },
              () => {
                console.log("Logins retrieved from db.");
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to check if list has been loaded yet.
    }
  }

  render() {
    const {
      error,
      isLoaded,
      items,
      loggedIn,
      currentUser,
      idArray,
      userArray,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (
      // if user not yet logged in, only show login form, no to do list
      this.state.loggedIn === false
    ) {
      return (
        <div className="app">
          <Header
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="pleaseLogin">
            <h2 className="redHeading">Please log in</h2>
          </div>
        </div>
      );
    } else {
      // Else if user is logged in, then show form and to do list for that user
      return (
        <div className="app">
          <Header
            currentUser={currentUser}
            handleLogin={this.handleLogin}
            handleRegister={this.handleRegister}
            handleUsername={this.handleUsername}
            handlePassword={this.handlePassword}
            loggedIn={loggedIn}
            handleLogout={this.handleLogout}
          />
          <div className="formAndListDiv">
            <ListForm
              handleAddItem={this.handleAddItem}
              handleItemToAdd={this.handleItemToAdd}
              handleDeleteItem={this.handleDeleteItem}
            />
            <DisplayList
              currentUser={currentUser}
              listItems={items}
              idArray={idArray}
              userArray={userArray}
              handleDeleteItem={this.handleDeleteItem}
            />
          </div>
        </div>
      );

      // End of if statement
    }
    // End of render function
  }

  // End of app class component
}

// Export component so it can be used by index.js
export default App;
