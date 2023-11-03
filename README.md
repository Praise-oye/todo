# HyperionDev Full Stack Web Development Bootcamp - Level 3 - Task 9 - To Do List

## Description

This assignment required enhancing a basic "To Do list" project, previously covered in the course. The enhancements included integrating MongoDB as a database to store the user's to-do list, ensuring that it remains available across multiple sessions. Additionally, user authentication was implemented using JWT (JSON Web Tokens). By logging in, a user gains the ability to add and remove items from their personal to-do list.


## Table of Contents

- [Instructions](#instructions)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Instructions

The following steps were provided to guide me in this task:

**Follow these steps:**

- You previously created a simple to-do app using React, where a user could add several items displayed as a todolist. The user could also delete specific items from the list.

- Modify this task so that users are required to log in to your application by entering a username and password directly.

- Each user's to-do list should be saved to a database. When a user logs in, they should only be able to see and modify their own to-do list. The user's to-do list should be preserved between sessions.

- Please make sure to use JWT as demonstrated in this task.

### Technologies

This project uses the following technologies:

- HTML
- CSS
- Javascript ECMAScript 2021
- React
- Node
- Express
- MongoDB
- JWT (JSON Web Tokens)

## Installation

To run this project, follow these steps:

Copy the project files to a directory called 'todolist' on your local machine.
Navigate to this directory from the command line interface. For example, type cd c:/todolist.
In the command line interface, type npm install.
Once the installation is complete, type npm start.
Now navigate to the "/frontend" directory inside "todolist". For example, type cd c:/todolist/frontend.
In the command line interface, once again type npm install.
Once the installation is complete, type npm start.
You have now started both the backend and frontend servers.
Open http://localhost:3000 to view the project in your web browser.

## Usage

1. Once you open the project in your browser http://localhost:3000, you will see the login form at the top of the screen.

### Register

2. To start using the app, you need to register as a user first. Type in the username and password that you want to use, and then click the "Register" button.

### Log in

3. To log in, enter your username and password (the ones you used to register as a user in the previous step), and click on the "Login" button.

You will now be able to add list items.

### Add List Items

4. To add an item to your list, simply type it into the box and click the "Add item" button. You will see your item displayed on the right.

### Delete List Item

5. To delete an item from your list, just click the red cross button next to the item.

### Logging Out

6. To log out of the list app, click the "Logout" button at the top right of the screen. The items you added to your list will be safely stored, and you will be able to view them again the next time you log into the app.

