# Social Network API

This is a RESTful API for a social network application built using **MongoDB** and **Express.js**. It allows users to share their thoughts, react to their friends' thoughts, and manage a list of friends.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Endpoints](#endpoints)
    -   [User Routes](#user-routes)
    -   [Thought Routes](#thought-routes)
-   Models
    -   [User Model](#user-model)
    -   [Thought Model](#thought-model)
-   License
-   Contributing
-   Questions

## Installation

1.  Clone the repository

```bash
git clone https://github.com/BenJR546/socialNetwork-api
```

2. Navigate to the project directory

```bash
cd socialNetwork-api
```

3. Install the dependencies

```bash
npm install
```

4. Set up the MongoDB database

-   Ensure you have MongoDB correctly installed and running on your local machine
-   The api connects to a local MongoDB database named `socialNetworkDB` by default.

5. Start the server

```bash
npm start
```

-   The server will start on `http://localhost:3001`
-   You should see the message `� Server running on port 3001!` in your terminal

## Usage

-   Use an API client like **Insomnia** or **Postman** to interact with the API.
-   The API provides enpoints to create, read, update, and delete users and thoughts.
-   You can also add and remove friends and reactions

## API Endpoints

### User Routes

-   Get all users

```bash
GET /api/users
```

-   Get a single user by ID

```bash
GET /api/users/:id
```

-   Create a new user

```bash
POST /api/users
```

Body:

```json
{
    "username": "johndoe",
    "email": "johndoe@example.com"
}
```

-   Update a user by ID

```bash
PUT /api/users/:id
```

Body:

```json
{
    "email": "johndoe@example.com"
}
```

-   Delete a user by ID

```bash
DELETE /api/users/:id
```

-   Add a friend to a user's friend list

```bash
POST /api/users/:userId/friends/:friendId
```

-   Remove a friend from a user's friend list

```bash
DELETE /api/users/:userId/friends/:friendId
```

### Thought Routes

-   Get all thoughts

```bash
GET /api/thoughts
```

-   Get a single thought by ID

```bash
GET /api/thoughts/:id
```

-   Create a new thought

```bash
POST /api/thoughts
```

Body:

```json
{
    "thoughtText": "This is a thought",
    "username": "johndoe"
}
```

-   Update a thought by ID

```bash
PUT /api/thoughts/:id
```

Body:

```json
{
    "thoughtText": "This is an updated thought"
}
```

-   Delete a thought by ID

```bash
DELETE /api/thoughts/:id
```

-   Add a reaction to a thought

```bash
POST /api/thoughts/:thoughtId/reactions
```

Body:

```json
{
    "reactionBody": "This is a reaction",
    "username": "johndoe"
}
```

-   Remove a reaction from a thought

```bash
DELETE /api/thoughts/:thoughtId/reactions/:reactionId
```

## Models

### User Model

-   Fields:
    -   **username**: String: Unique, required
    -   **email**: String: Unique, required, must be a valid email address
    -   **thoughts**: Array: Arrar of **\_id** values referencing the Thought model
    -   **friends**: Array: Array of **\_id** values self-referencing the User model
-   Virtuals:
    -   **friendCount**: Number: Returns the length of the user's friends array
-   Reaction Subdocument Schema (`ReactionSchema`):
    -   **reactionId**: ObjectId: Unique ID for the reaction, generated automatically
    -   **reactionBody**: String: Required, max length 280
    -   **username**: String: Username of the user who created the reaction, required
    -   **CreatedAt**: Date: Timestamp of when the reaction was created, defaults to current time.

## License

This project is unlicensed. Please feel free to implement this project in any way you see fit.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch** with a descriptive name
3. **Make your changes** and commit them with clear messages
4. **Push your changes** to your forked repository
5. **Create a pull request** to the main repository

## Questions

If you have any questions or need help with anything, feel free to reach out to me by [email](mailto:benjr546@gmail.com) or my [GitHub profile](https://github.com/BenJR546).

Thank you for your interest in this project!
