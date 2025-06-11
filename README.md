# Auth-Next

A Next.js application demonstrating user authentication functionalities including signup, login, profile management, password reset, and email verification.

## Features

- User Signup
- User Login
- User Profile Page
- Email Verification
- Secure API routes for authentication

## Technologies Used

This project is built with the following technologies:

- **Next.js**: React framework for building server-side rendered and static web applications.
- **React**: JavaScript library for building user interfaces.
- **Mongoose**: MongoDB object modeling for Node.js.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens for authentication.
- **Nodemailer**: For sending emails (e.g., verification emails, password reset emails).
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **TypeScript**: Superset of JavaScript that adds static types.
- **ESLint**: Pluggable linting utility for JavaScript and JSX.
- **Bun**: Fast all-in-one JavaScript runtime, bundler, test runner, and package manager.

## Folder Structure

The `src/` directory contains the core application logic:

- `src/app/`: Contains Next.js pages and API routes.
    - `api/users/`: API endpoints for user authentication (signup, login, logout, me, forgotpassword, verifyemail).
    - `login/`: Login page.
    - `signup/`: Signup page.
    - `profile/`: User profile page.
    - `verifyemail/`: Email verification page.

- `src/dbConfig/`: Database configuration, specifically `dbConfig.ts` for connecting to MongoDB.
- `src/helper/`: Utility functions, such as `getDataFromToken.ts` for extracting user data from JWT and `mailer.ts` for sending emails.
- `src/models/`: Defines Mongoose schemas and models, e.g., `userModels.js` for the user schema.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/auth-next.git
   cd auth-next
   ```
2. Install dependencies:
   ```bash
   npm install
   # or using yarn
   # yarn install
   # or using bun
   # bun install
   ```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=a_strong_secret_key_for_jwt
NODEMAILER_USER=your_email@example.com
NODEMAILER_PASS=your_email_password_or_app_specific_password
```

Replace the placeholder values with your actual MongoDB connection string, a strong secret for JWT, and your email credentials for Nodemailer.

### Running the Development Server

```bash
npm run dev
# or using yarn
# yarn dev
# or using bun
# bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev` (or `bun dev`): Runs the application in development mode with hot-reloading.
- `npm run build` (or `bun build`): Builds the application for production to the `.next` folder.
- `npm run start` (or `bun start`): Starts the production-built application.
- `npm run lint` (or `bun lint`): Runs ESLint to check for code quality issues.
