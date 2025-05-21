# Maritime Operations Dashboard API

A robust backend solution for a Maritime Operations Dashboard with user authentication and ship data management.

## Features

- User authentication with JWT
- Password encryption with bcrypt
- User management (signup/login)
- Ship details API
- MongoDB integration
- Error handling and validation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB account

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

4. Start the server
```
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user (protected)

### Ships

- `GET /api/ships/details?name=SHIPNAME` - Get ship details by name (protected)
- `GET /api/ships` - Get all ships (protected)
- `POST /api/ships` - Create a new ship (protected)

## API Testing

Import the Postman collection from the `postman` folder to test the API endpoints.

## Deployment

The API can be deployed to any Node.js hosting service:

1. Heroku
2. Vercel
3. DigitalOcean
4. AWS EC2

## License

This project is licensed under the MIT License.