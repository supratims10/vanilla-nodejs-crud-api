# Node.js CRUD API (Vanilla Node.js)

This is a simple CRUD (Create, Read, Update, Delete) API built using **Vanilla Node.js** without any external frameworks. The API manages a list of movies stored in a `movies.json` file.

## Features
1. **GET** - Retrieve a list of all movies or fetch details of a specific movie.
2. **POST** - Add a new movie to the list.
3. **PUT** - Update details of an existing movie.
4. **DELETE** - Remove a movie from the list.

## Project Structure
```
NODEJS_CRUD/
│-- data/
│   ├── movies.json
│-- methods/
│   ├── delete.js
│   ├── get.js
│   ├── post.js
│   ├── put.js
│-- node_modules/
│-- util/
│   ├── bodyparser.js
│   ├── writeFile.js
│-- .env
│-- package-lock.json
│-- package.json
│-- server.js
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/nodejs_crud.git
   cd nodejs_crud
   ```
2. Initialize the project:
   ```sh
   npm init -y
   ```
3. Run the server:
   ```sh
   node server.js
   ```

## API Endpoints

### 1. Get All Movies or a Specific Movie
- **GET** `/movies` → Get a list of all movies.
- **GET** `/movies/:id` → Get details of a specific movie.

Example (Using Postman/Thunder Client):
```
GET http://localhost:3000/movies
GET http://localhost:3000/movies/1
```

### 2. Add a New Movie
- **POST** `/movies`
- **Request Body (JSON)**:
  ```json
  {
    "id": 3,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010
  }
  ```
- Example (Using Postman/Thunder Client):
```
POST http://localhost:3000/movies
```

### 3. Update a Movie
- **PUT** `/movies/:id`
- **Request Body (JSON)**:
  ```json
  {
    "title": "Interstellar",
    "director": "Christopher Nolan",
    "year": 2014
  }
  ```
- Example (Using Postman/Thunder Client):
```
PUT http://localhost:3000/movies/3
```

### 4. Delete a Movie
- **DELETE** `/movies/:id`

Example (Using Postman/Thunder Client):
```
DELETE http://localhost:3000/movies/3
```

## Notes
- The server reads and writes to `movies.json` file to store movie data.
- Make sure the `movies.json` file has a valid JSON structure.
- Use tools like **Postman** or **Thunder Client** to test API endpoints.

## License
This project is open-source and free to use.
