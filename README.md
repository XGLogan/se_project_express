# WTWR (What to Wear?) — Back End

This back-end project provides the server-side API for the WTWR application. It supports user registration and login with JWT-based authorization, user profile management, and CRUD operations for clothing items, including liking and unliking items.

## Deployed Project

- Backend API: https://api.mojoteeth.ca
- Frontend: https://ocp.mojoteeth.ca
- Frontend repository: https://github.com/XGLogan/se_project_react

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1WmQFQ08_gdiuC19S37w4qL6gtRCs-Gf1/view?usp=drive_link), where I describe my project and some challenges I faced while building it.

## Features

- User signup
- User signin with JWT token
- Get current user data
- Update current user profile
- Get all clothing items
- Create clothing items
- Delete clothing items
- Like and unlike clothing items
- Route protection with authorization middleware
- Request validation with celebrate and Joi
- Centralized error handling with custom error classes
- Request and error logging with winston

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- validator
- celebrate / Joi
- winston / express-winston
- cors
- ESLint
- PM2 and nginx for deployment

## Running the Project

Make sure MongoDB is running locally.

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

Start the server with hot reload:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```
