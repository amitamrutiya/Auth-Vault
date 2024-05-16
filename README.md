# [Auth-Vault](https://authvault.vercel.app/) Next.js Authentication Project 🛡️

This is a Next.js project focusing on complex authentication logic implemented using NextAuth.js, Prisma, Zod, and a custom email verification resend service. The project aims to provide a robust authentication system with various features for both admin and regular users.

![image](https://github.com/amitamrutiya2210/Auth-Vault/assets/91112485/11217f3b-ed50-4bc5-a706-91ea050a7364)


## Features 🚀

- **Multiple Authentication Methods**:
  - Users can create accounts or log in using GitHub, Google, or manually with email/password.

- **Email Verification**:
  - Verification email links are sent using a resend service to ensure email validity.

- **Role-based Access Control**:
  - Admin and normal user functionalities are distinguished.

- **Two-Factor Authentication (2FA)**:
  - Implemented with OTP generation for added security during login.

- **User Account Management**:
  - Users can update their names, emails, and passwords.

- **Role Switching**:
  - Capability to switch roles from a normal user to an admin.

## Technologies Used 💻

- **Next.js**: React framework for server-rendered React applications.
- **TypeScript**: Language that gives types to javascript.
- **NextAuth**: Authentication library for Next.js applications.
- **Prisma**: Database toolkit for TypeScript and Node.js.
- **Zod**: TypeScript-first schema validation library.
- **Resend**: Custom service for handling email verification resends.

## Getting Started 🏁

### Prerequisites 📋

- Node.js (v14 or higher)
- PostgreSQL (or another supported Prisma database)

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/amitamrutiya2210/Auth-Vault
  ```

2. Navigate to the project directory:

  ```bash
  cd Auth-Vault
  ```

3. Install dependencies:

  ```bash
  npm install
  ```
   
4. Set up environment variables:

Create a .env.local file in the root directory from the sample.env.local file:

  ```bash
  cp .env.local .sample.env.local
  ```

5.Run the development server:

  ```bash
  npm run dev
  ```

6. Open http://localhost:3000 in your browser to see the application.

## Contributing 🤝
This project is open-source. Contributions are welcome! Feel free to fork the repository and submit pull requests. This is an open-source project. Anyone who wants to implement authentication for a Next.js project using NextAuth.js can simply come to this repository, copy the code, and use it for their own authentication system.
