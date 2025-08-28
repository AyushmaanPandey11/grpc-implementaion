# gRPC User Management Service

## Overview

- The User Management Service is a backend application built with Node.js and gRPC. It provides a robust, high-performance API for managing user data, including creating, retrieving, updating, and deleting user records. The service uses Protocol Buffers (.proto) to define the data structures and service contract, ensuring type-safe and efficient communication between the client and server.

- This project demonstrates a foundational gRPC server implementation that can be extended for various applications requiring efficient data exchange.

## Key Features

- gRPC and Protocol Buffers: Utilizes gRPC for a modern, high-performance RPC framework and Protocol Buffers for defining structured and strongly typed messages.

- Type Safety: The use of Protocol Buffers and TypeScript ensures that the data being sent and received conforms to a defined schema, reducing runtime errors.

- Error Handling: The service handles various error scenarios, such as a user not being found, and returns appropriate gRPC status codes.

## Setup Instructions

1. Clone the Repository:
   git clone https://github.com/AyushmaanPandey11/grpc-implementaion.git
   cd grpc impl

2. Install Dependencies:
   npm install

3. Generate Proto file Types:

   1. cd src
   2. run this script in src directory
      `../node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=generated ./a.proto    `
   3. This will generates types in the src directory.

4. Start the gRPC Server
   Run the server using the command:
   npm run dev

5. The server will start and listen on 0.0.0.0:5051.

## Usage

- The application supports four RPCs as defined in the UserManagementService service.

- The example data is pre-populated in a local object for demonstration purposes.

## RPCs

1. AddUser(User) returns (User)

Adds a new user to the system.

Request Example:

    ```
        {
            "username": "newuser",
            "fullname": "New User",
            "age": 30,
            "sex": "M",
            "addr": {
            "flat_no": "C-303",
            "city": "Pune",
            "state": "Maharashtra",
            "country": "India"
            },
            "emails": ["newuser@example.com"],
            "phone_numbers": [{
            "number": "+911234567890",
            "type": "MOBILE"
            }]
        }
    ```

2. GetUserByUsername(UsernameRequest) returns (User)

- Retrieves a single user by their username.

- Request Example:

  ```
      {
      "username": "ayush123"
      }
  ```

3. UpdateUserByUsername(UpdateUserRequest) returns (User)

- Updates an existing user's details.

- Request Example:

  ```
      {
          "username": "ayush123",
          "user": {
          "username": "ayush123",
          "fullname": "Ayushmaan Kumar",
          "age": 26,
          "sex": "M",
          "addr": {
            "flat_no": "A-101",
            "city": "Mumbai",
            "state": "Maharashtra",
            "country": "India"
          },
          "emails": ["ayush.updated@example.com"],
          "phone_numbers": [{
              "number": "+919988776655",
              "type": "WORK"
              }]
          }
      }
  ```

4. DeleteUserByUsername(UsernameRequest) returns (DeleteUserResponse)

- Deletes a user from the system.

- Request Example:

  ```
      {
      "username": "srujan456"
      }
  ```

Notes

- All RPCs can be tested using a gRPC client, such as gRPCurl or Postman with the gRPC plugin.

- The internal data store is a simple in-memory object, which means data will not persist after the server is restarted. For a production environment, this would be replaced by a database like MongoDB or PostgreSQL.
