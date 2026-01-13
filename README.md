# Zent.ai - Text to Image SaaS Platform

A full-stack SaaS application that allows users to generate images from text prompts using AI. Built with React, Node.js, Express, and MongoDB, featuring a credit-based payment system integrated with Razorpay.

## 🚀 Features

### Core Features
- **AI-Powered Image Generation**: Generate high-quality images from text prompts using Clipdrop API
- **User Authentication**: Secure user registration and login with JWT-based authentication
- **Credit System**: Credit-based model where each image generation costs 1 credit
- **Payment Integration**: Seamless payment processing with Razorpay for purchasing credits
- **Multiple Pricing Plans**: Three subscription tiers (Basic, Advanced, Business)
- **Real-time Credit Balance**: Track your credit balance in real-time
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Image Download**: Download generated images directly from the platform

### User Experience Features
- **Smooth Animations**: Beautiful animations powered by Motion library
- **Toast Notifications**: User-friendly notifications for actions and errors
- **Protected Routes**: Secure API endpoints with authentication middleware
- **Transaction History**: Complete payment and transaction tracking
- **Testimonials Section**: Social proof and user testimonials
- **Step-by-step Guide**: Easy-to-follow instructions for new users

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Motion (Framer Motion)** - Animation library
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (JSON Web Tokens)** - Authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway integration
- **Axios** - HTTP client for external API calls

### External Services
- **Clipdrop API** - AI image generation service
- **Razorpay** - Payment processing
- **MongoDB Atlas** - Cloud database (or local MongoDB)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zent_text_to_image_saas
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Get API Keys

#### Clipdrop API Key
1. Visit [Clipdrop API](https://clipdrop.co/apis)
2. Sign up for an account
3. Get your API key from the dashboard

#### Razorpay API Keys
1. Visit [Razorpay](https://razorpay.com/)
2. Create a merchant account
3. Navigate to Settings → API Keys
4. Generate API Key and Secret Key

#### MongoDB Setup
- **Option 1 (Local)**: Install MongoDB locally and use `mongodb://localhost:27017`
- **Option 2 (Cloud)**: Use MongoDB Atlas (free tier available) and get your connection string


## 📁 Project Structure

```
zent_text_to_image_saas/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React Context for state management
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Express application
│   ├── config/           # Configuration files
│   │   └── mongodb.js    # MongoDB connection
│   ├── controllers/      # Route controllers
│   │   ├── imageControllers.js
│   │   └── userControllers.js
│   ├── middlewares/      # Custom middleware
│   │   └── auth.js       # JWT authentication
│   ├── models/           # MongoDB models
│   │   ├── userModels.js
│   │   └── transactionModels.js
│   ├── routes/           # API routes
│   │   ├── imageRoutes.js
│   │   └── userRoutes.js
│   ├── server.js         # Express server entry point
│   └── package.json
│
└── README.md
```


## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes with middleware
- Secure payment processing
- Environment variables for sensitive data

## 🎨 UI/UX Features

- Modern gradient design (Teal to Orange)
- Smooth page transitions and animations
- Responsive layout for all devices
- Loading states and error handling
- Toast notifications for user feedback
- Clean and intuitive navigation

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MongoDB is running (if using local)
   - Verify `MONGODB_URL` in `.env` is correct
   - Check network connectivity for MongoDB Atlas

2. **API Key Errors**
   - Verify all API keys are correctly set in `.env` files
   - Ensure Clipdrop API key is valid and has credits
   - Check Razorpay keys are from the same account (test/live)

3. **Port Already in Use**
   - Change `PORT` in server `.env` file
   - Or stop the process using the port

4. **CORS Errors**
   - Ensure backend CORS is properly configured
   - Check that frontend URL is allowed in CORS settings

5. **Payment Issues**
   - Verify Razorpay keys match your account environment (test/live)
   - Check that Razorpay script is loaded in the frontend
   - Ensure payment handler is properly configured

## 📝 Development Notes

- The application uses ES6 modules (`import/export`)
- Server runs with `nodemon` for auto-restart in development
- Frontend uses Vite for fast HMR (Hot Module Replacement)
- All API calls are made through Axios
- State management is handled via React Context API

## 🚧 Future Enhancements

Potential features for future development:
- Image history and gallery
- Multiple image generation styles
- Social sharing capabilities
- User profile management

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Node.js, and Express**
