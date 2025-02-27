# Next.js Project

## Overview
This is a Next.js project that requires specific environment variables to run properly. Please follow the instructions below to set up your local environment.

## Prerequisites
- Node.js (version 14 or later)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the Repository
First, clone the repository to your local machine:

### 2. Install Dependencies
Run the following command to install the necessary dependencies:

### 3. Set Up Environment Variables
Create a `.env.local` file in the root of your project and add the following environment variables:

AUTH_GOOGLE_ID="your_google_auth_id_here"

AUTH_GOOGLE_SECRET="your_google_auth_secret_here"

AUTH_SECRET="your_auth_secret_here"

NEXT_PUBLIC_OPENAI_API_KEY="your_openai_api_key_here"

### 4. Run the Project
To start the development server, run:
```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

### 5. Build for Production
To create an optimized production build, run:
```bash
npm run build
```

### 6. Start the Production Server
To start the production server, run:
```bash
npm start
```

## Additional Information
For more details on Next.js, visit the [Next.js Documentation](https://nextjs.org/docs).

## License
This project is licensed under the MIT License.