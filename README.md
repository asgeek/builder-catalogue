# Builder Catalogue

Builder Catalogue is a service that lets users explore their existing collections and assess what sets can be built from the pieces that they already own. It uses a database of building sets and a related service where users can record their inventories of building pieces digitally to track and compare their collections.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Docker

### Installing

1. Clone the repository
```
git clone https://github.com/yourusername/builder-catalogue.git
```

2. Install dependencies
```
cd builder-catalogue
npm install
```

3. Start development server
```
npm start
```

4. You can also, build and run the Docker container for development
```
docker-compose -f docker-compose.yaml up --build
```

The server will start on `http://localhost:3000`.

For production, you can build and run the Docker container using the Dockerfile:
```
docker build -t catalogue .
docker run -p 3000:3000 -e API_URL=https://d16m5wbro86fg2.cloudfront.net catalogue
```

## Usage

The application provides several endpoints to interact with the user's inventory and the available sets.

### Endpoints

- `GET /user/:username/buildable-sets`: Returns a list of sets that the user can build with their existing inventory of pieces.
- `GET /user/:username/set/:setname/missing-pieces`: Returns a list of pieces that the user is missing to build a specific set.
- `GET /user/:username/set/:setname/collaborators`: Returns a list of users who can collaborate with the user to build a specific set.

### Example

To get a list of sets that the user brickfan35 can build with their existing inventory of pieces, you would send a GET request to `/user/brickfan35/buildable-sets`.


## Postman collection
A Postman collection has been provided in the repository to help you interact with the API endpoints. The collection is named `builder-catalogue.postman_collection.json`. You can import this collection into your Postman application.

The collection includes pre-configured requests for all the available endpoints. You just need to replace the placeholders in the URLs with actual values. For example, replace `:username` with a real username and `:setname` with a real set name.

The collection also includes environment variables for the base URL (`base_url`) and the data URL (`data_url`). You can set these variables in your Postman environment to point to your local server or to the production server.

Here is a brief description of the requests included in the collection:

- `buildable-sets`: GET request to `/user/:username/buildable-sets` to get a list of sets that the user can build with their existing inventory of pieces.
- `missing-pieces`: GET request to `/user/:username/set/:setname/missing-pieces` to get a list of pieces that the user is missing to build a specific set.
- `collaborators`: GET request to `/user/:username/set/:setname/collaborators` to get a list of users who can collaborate with the user to build a specific set.
- `_all-users`: GET request to `/users` to get a list of all users.
- `_user-by-name`: GET request to `/user/by-username/:username` to get the details of a user by username.
- `_user-by-id`: GET request to `/user/by-id/:user_id` to get the details of a user by user ID.
- `_all-sets`: GET request to `/sets` to get a list of all sets.
- `_set-by-name`: GET request to `/set/by-name/:set_name` to get the details of a set by set name.
- `_set-by-id`: GET request to `/set/by-id/:set_id` to get the details of a set by set ID.
- `_colors`: GET request to `/colours` to get a list of all available colors.

Please refer to the Postman documentation if you need help on how to import a collection or how to use environment variables.

## Running the tests

To run the tests, use the following command:
```
npm test
```

## Built with

- Node.js
- Express
- Axios
- Node-cache
- Docker

## Authors

- Asela Sandaruwan
