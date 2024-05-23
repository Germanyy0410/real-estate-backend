# Real Estate Backend
This project is a backend application built with Node.js and Express for managing real estate listings. It utilizes MongoDB as the primary database, with Prisma ORM for seamless database interactions. The application includes functionality for buying and renting properties, with data crawled from [batdongsan.com.vn](https://batdongsan.com.vn/) Additionally, it provides user authentication using JWT (JSON Web Tokens) and allows users to save their favorite property listings.

## Features
- Property Management: Buy and rent listings from batdongsan.com are crawled and stored in the database.
- Authentication: Users can sign up, log in, and authenticate using JWT.
Favorite Listings: Authenticated users can save their favorite property listings to their account.
- RESTful API: Well-structured API endpoints for managing properties and user accounts.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Prisma
- JWT

## Installation
Clone the repository:
```bash
git clone https://github.com/Germanyy0410/real-estate-backend
```
## Install dependencies:
```bash
npm install
```
## Set up environment variables:
Create a .env file in the root directory based on our .env.example file:

```bash
MONGODB_URI='YOUR_MONGODB_URI'
PORT=3001
JWT_SECRET_KEY='YOUR_JWT_SECRET_KEY'
```

## Run the application:
```bash
npm start
```
