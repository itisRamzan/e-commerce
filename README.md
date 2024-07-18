# 📢 E-Commerce

A robust e-commerce platform built using Next.js, MongoDB, and other technologies for seamless online shopping experiences.

## 🚀 Features

- **User Authentication**: Secure user sign-up and login functionality using bcrypt for password hashing and JWT for session management.
- **Product Management**: CRUD operations for products with image uploading capabilities using Cloudinary.
- **Payment Integration**: Integration with Razorpay for secure and reliable payment processing.
- **Email Notifications**: Nodemailer integration for sending order confirmations and updates to users.
- **Responsive Design**: Utilizes Tailwind CSS for a mobile-first responsive design approach.
- **State Management**: Zustand for efficient state management within the React components.
- **Toast Notifications**: React Toastify for displaying non-intrusive notifications to users.

## 🛠️ Technologies Used

- **Next.js**: React framework for server-side rendering and frontend logic.
- **MongoDB**: NoSQL database for storing product information and user data.
- **Express.js**: Minimalist web framework for handling backend API requests.
- **Node.js**: JavaScript runtime for server-side operations.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **Zustand**: State management library for React applications.

## ⬇️ Installation

1. Clone the repository:
  ```bash
   git clone https://github.com/your_username/e-commerce.git
   cd e-commerce
  ```
2. Install dependencies:
  ```bash
    npm install
  ```
3. Set up environment variables:

Create a .env file in the root directory based on .env.example.
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
DB_URL=""
NEXT_PUBLIC_HOST=""
SENDER_EMAIL=""
SENDER_PASSWORD=""
JWT_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```
4. Start the development server:
```bash
npm run dev
```
5. Open your browser and visit ```http://localhost:3000``` to view the app.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)
