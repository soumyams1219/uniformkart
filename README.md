# UniformKart

UniformKart is a full-stack eCommerce platform designed for schools, students, and parents to purchase school uniforms online. The platform provides an easy way to browse uniforms, manage orders, and streamline the uniform purchasing process.

## Features

### User Features

* User Registration and Login
* Browse School Uniforms
* Search and Filter Products
* Product Details Page
* Shopping Cart
* Secure Checkout
* Order Placement
* Payment Integration
* Order History
* User Profile Management

### Admin Features

* Admin Dashboard
* School Management
* Product Management
* Category Management
* Order Management
* Customer Management
* Inventory Tracking

### Additional Features

* Responsive Design
* JWT Authentication
* REST API Integration
* Role-Based Access Control
* Image Upload Support
* Secure Data Management

## Technology Stack

### Frontend

* React.js
* Ant Design
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)

## Installation

### Clone Repository


git clone https://github.com/soumyams1219/uniformkart.git


### Backend Setup


cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start Backend Server:

npm run dev


### Frontend Setup

cd frontend
npm install
npm start


## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Schools

* GET /api/schools
* POST /api/schools
* PUT /api/schools/:id
* DELETE /api/schools/:id

### Products

* GET /api/products
* POST /api/products
* PUT /api/products/:id
* DELETE /api/products/:id

### Orders

* GET /api/orders
* POST /api/orders


## Author

Soumya MS

GitHub: https://github.com/soumyams1219

## License

This project is intended for educational and portfolio purposes.
