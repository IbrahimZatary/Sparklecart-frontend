#  SparkleCart - Complete E-Commerce Platform

![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?logo=.net)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019-CC2927?logo=microsoftsqlserver)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green.svg)

##  Overview

SparkleCart is a modern full-stack e-commerce platform built with **.NET 10**, **React 18**, **Tailwind CSS**, and **SQL Server**. It provides a complete online shopping experience with secure authentication, product management, shopping cart functionality, order processing, and inventory management.

---

##  Features

###  Authentication & Security

* JWT-based authentication
* User registration and login
* Secure password hashing using BCrypt
* Protected API endpoints

###  Shopping Experience

* Browse product catalog
* Search and filter products
* Add products to cart
* Update cart quantities
* Remove items from cart
* Checkout and order placement

###  Inventory Management

* Full CRUD operations for products
* Category management
* Real-time stock updates
* Automatic inventory tracking

###  Modern User Interface

* Responsive design for all devices
* Built with Tailwind CSS
* Clean and playful geometric design
* Fast and intuitive navigation

###  Order Management

* Place orders securely
* View order history
* Track purchased items

---

#  Tech Stack

## Backend

* .NET 10
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* BCrypt Password Hashing

## Frontend

* React 18
* Tailwind CSS
* Axios
* React Router DOM
* Vite

---

#  Project Structure

## Backend

```text
SparkeApp/
├── Controllers/
│   ├── AuthController.cs
│   ├── ProductController.cs
│   ├── CategoryController.cs
│   ├── CartController.cs
│   └── OrderController.cs
├── Services/
│   ├── Interfaces/
│   └── Implementations/
├── Models/
├── DTOs/
├── Data/
│   └── AppDbContext.cs
├── Middleware/
│   └── GlobalExceptionMiddleware.cs
└── Program.cs
```

## Frontend

```text
sparkle/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   └── Inventory.jsx
│   │   └── Categories.jsx
│   ├── services/
│   │   └── apiClient.js
│   ├── assets/
│   └── App.jsx
└── package.json
```

---

#  Installation

## Prerequisites

Ensure the following tools are installed:

* .NET 10 SDK
* Node.js 18+
* SQL Server (LocalDB or Express)
* Git

---

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/IbrahimZatary/Sparklecart-backend.git
cd SparkeApp
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Configure Database & JWT Settings

Update your `appsettings.json` file:

```json
{
  "ConnectionStrings": {
    "DBConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Sparkle_Db;Trusted_Connection=True;"
  },
  "JwtSettings": {
    "Secret": "your-super-secret-key-minimum-32-characters",
    "Issuer": "SparkeApp",
    "Audience": "SparkeAppUsers",
    "ExpiryMinutes": 1440
  }
}
```

### 4. Apply Database Migrations

```bash
dotnet ef database update
```

### 5. Run the Backend

```bash
dotnet run
```

Backend URL:

```text
https://localhost:7161
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd sparkle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://localhost:7161/api
```

### 4. Run Development Server

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/auth/sign-up` | Register a new user |
| POST   | `/api/auth/login`   | User login          |

## Products

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/product`      | Get all products  |
| GET    | `/api/product/{id}` | Get product by ID |
| POST   | `/api/product`      | Create product    |
| PUT    | `/api/product/{id}` | Update product    |
| DELETE | `/api/product/{id}` | Delete product    |

## Cart

| Method | Endpoint                        | Description          |
| ------ | ------------------------------- | -------------------- |
| GET    | `/api/cart/{userId}`            | Get user cart        |
| POST   | `/api/cart/add?userID={userId}` | Add item to cart     |
| PUT    | `/api/cart/quantity`            | Update item quantity |
| POST   | `/api/cart/checkout`            | Checkout cart        |

## Orders

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/order`      | Get all orders  |
| GET    | `/api/order/{id}` | Get order by ID |

## Categories

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/category`      | Get all categories |
| GET    | `/api/category/{id}` | Get category by ID |
| POST   | `/api/category`      | Create category    |
| PUT    | `/api/category`      | Update category    |
| DELETE | `/api/category/{id}` | Delete category    |

---

#  Environment Variables

## Backend (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DBConnectionString": "your_connection_string"
  },
  "JwtSettings": {
    "Secret": "your_jwt_secret",
    "Issuer": "SparkeApp",
    "Audience": "SparkeAppUsers",
    "ExpiryMinutes": 1440
  }
}
```

## Frontend (`.env`)

```env
VITE_API_URL=https://your-backend-url/api
```

---

#  Database Schema

### Tables

* Users
* Products
* Categories
* Carts
* CartItems
* Orders
* OrderItems

---

#  Authentication Flow

1. User registers using name, email, and password.
2. Password is securely hashed with BCrypt.
3. User logs in using email and password.
4. Server validates credentials.
5. JWT token is generated and returned.
6. Token is stored in local storage.
7. Token is sent in the `Authorization` header for authenticated requests.

---

#  Error Handling

The application uses a global exception middleware that:

* Catches unhandled exceptions
* Returns consistent API responses
* Logs errors for debugging
* Provides user-friendly error messages

---

# Deployment

## Backend Deployment

Publish the application:

```bash
dotnet publish -c Release -o ./publish
```

Deploy the generated files to your preferred hosting provider:

* Azure App Service
* AWS Elastic Beanstalk
* IIS
* Docker

## Frontend Deployment

Build the project:

```bash
npm run build
```

Deploy the generated `dist` folder to:

* Vercel
* Netlify
* GitHub Pages

---

#  Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to GitHub

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for additional information.

---

#  Author

**Ibrahim Zatary**

GitHub: https://github.com/IbrahimZatary

---

# 🔗 Project Links

### Frontend Repository

https://github.com/IbrahimZatary/Sparklecart-frontend

### Backend Repository

https://github.com/IbrahimZatary/Sparklecart-backend

---

#  Acknowledgments

Special thanks to:

* .NET Community
* React Team
* Tailwind CSS Team
* Open Source Contributors
* Everyone who supported this project

---

⭐ If you find this project helpful, consider giving it a star on GitHub.
