# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI and includes additional features for authentication, authorization, validation, and API documentation.

## Features

- **JWT Authentication**: Secure your endpoints with JSON Web Token-based authentication.
- **Role-Based Authorization**: Control access to resources based on user roles.
- **Zod Validation**: Ensure data integrity with Zod schema validation.
- **Swagger Documentation**: Automatically generate and serve API documentation using Swagger UI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Starts the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

Runs the app in production mode.

### `npm run test`

Executes the test cases.

## API Documentation

Once the server is running, you can access the Swagger UI documentation at:

[http://localhost:3000/documentation](http://localhost:3000/documentation)

This provides an interactive interface to explore and test your API endpoints.

## Authentication

To authenticate, obtain a JWT token by sending a POST request to the `/login` endpoint with valid credentials. Include this token in the `Authorization` header of subsequent requests:

```
Authorization: Bearer <your_jwt_token>
```

## Authorization

Endpoints are protected based on user roles. Ensure your JWT token includes the appropriate role claims to access restricted resources.

## Validation

Request and response payloads are validated using Zod schemas. Refer to the API documentation for the expected data structures.
