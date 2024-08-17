# Backend Repository

This repository contains the backend code for the project. It is built using Node.js, Express.js, MongoDB, and dotenv.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Create a new directory and navigate into it:**
   ```bash
   mkdir myapp
   cd myapp

2. **Initialize a new Node.js project:**
    ```bash
    npm init -y
3. **Install necessary dependencies:**
    ```bash
    npm install express cors mongodb dotenv
4. **Create a .env file in the root directory to manage environment variables:**
    DB_USER= Your Database User Id
    DB_PASS= Your Database Password
5. **Run the backend server with nodemon:**
    ```bash
    nodemon index.js

### Project Structure
- index.js: Entry point of the application.
- /routes: Contains route definitions for the API.
- /controllers: Handles the logic for processing requests and interacting with the database.
- /models: Defines the MongoDB schemas and models.
### API Endpoints
- GET /products: Fetch all products with optional filtering, sorting, and pagination.
 1. Query Parameters:
- brand: Filter by brand name (e.g., Apple, Samsung).
- category: Filter by category (e.g., Smartphone, TV).
- price: Filter by price range (e.g., 0-1000).
- sort: Sort products by price or creation date.
- page: Pagination, current page number.
- limit: Number of products per page.
## Additional Notes
- Ensure MongoDB is running before starting the server.
- The API provides full CRUD operations on the product data.
