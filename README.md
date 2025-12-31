# SpiceUp - E-Commerce Platform

A full-stack e-commerce web application built with React and Node.js, designed to provide a seamless online shopping experience for spices and related products.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

SpiceUp is a modern e-commerce platform that enables users to browse, search, and purchase spices and related products online. The application features a responsive user interface, secure authentication, shopping cart functionality, and an admin panel for managing products, categories, and orders.

## ✨ Features

### User Features
- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Product Browsing**: Browse products by categories with search and filter capabilities
- **Shopping Cart**: Add, update, and remove items from the cart
- **Order Management**: Place orders and track order history
- **Product Reviews**: Rate and review purchased products
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Product Management**: Create, update, and delete products
- **Category Management**: Organize products into categories
- **Order Management**: View and manage customer orders
- **User Management**: Manage user accounts and permissions
- **Image Upload**: GridFS-based image storage for product images

## 🛠 Technology Stack

### Frontend
- **React** (v18.3.1) - UI library
- **Redux** - State management
- **React Router** (v6.26.2) - Client-side routing
- **Ant Design** (v5.20.6) - UI component library
- **Material-UI** (v6.1.0) - Additional UI components
- **Bootstrap** (v5.3.3) - CSS framework
- **Axios** - HTTP client
- **SASS** - CSS preprocessor

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.21.0) - Web framework
- **MongoDB** - Database
- **Mongoose** (v8.6.3) - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **GridFS** - File storage system
- **Nodemailer** - Email service
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
SE347_SpiceUp/
├── FrontEnd/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── assets/          # Images, fonts, and other assets
│   │   ├── components/      # React components
│   │   │   ├── Admin/       # Admin panel components
│   │   │   ├── Auth/        # Authentication components
│   │   │   └── User/        # User-facing components
│   │   ├── redux/           # Redux store and slices
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   ├── AppAdmin.js      # Admin app component
│   │   └── index.js         # Entry point
│   └── package.json
│
├── BackEnd/                  # Node.js backend application
│   ├── apis/                # API route definitions
│   ├── config/              # Configuration files
│   │   ├── db/              # Database configuration
│   │   └── gridfs/          # GridFS configuration
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Server entry point
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0 or higher)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/NDHunq/SE347_SpiceUp.git
cd SE347_SpiceUp
```

### 2. Install Frontend Dependencies

```bash
cd FrontEnd
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../BackEnd
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `BackEnd` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/spiceup

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration (for Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Frontend Configuration

If needed, create a `.env` file in the `FrontEnd` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Development Mode

#### Start the Backend Server

```bash
cd BackEnd
npm start
```

The backend server will start on `http://localhost:5000` (or the port specified in your `.env` file).

#### Start the Frontend Development Server

Open a new terminal window:

```bash
cd FrontEnd
npm start
```

The React application will automatically open in your browser at `http://localhost:3000`.

### Production Build

#### Build the Frontend

```bash
cd FrontEnd
npm run build
```

This creates an optimized production build in the `build` folder.

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

#### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

#### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

#### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Admin)

#### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

#### Images
- `POST /api/images/upload` - Upload image
- `GET /api/images/:id` - Get image by ID

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Built as part of the SE347 course project
- Special thanks to the open-source community for the amazing tools and libraries

---

**Note**: This is a student project developed for educational purposes as part of the SE347 course.
