# Wearix

A modern full-stack e-commerce platform built with the MERN stack, providing a seamless shopping experience for customers and a powerful dashboard for administrators. The platform includes secure authentication, payment gateway integration, wishlist and cart management, order tracking, and cloud-based image storage.

## Features

### Customer Features

* User registration and login
* Google OAuth 2.0 authentication
* Email verification and password recovery
* Product browsing and collections
* Product detail pages
* Shopping cart management
* Wishlist functionality
* Secure checkout process
* Stripe and Razorpay payment integration
* Order placement and order history
* Profile management and account settings

### Admin Features

* Secure admin authentication
* Add and manage products
* Product image uploads
* View and manage customer orders
* Update order statuses
* Product inventory management

## Tech Stack

### Frontend

* React 19
* Vite 8
* Tailwind CSS 4
* React Router DOM
* Zustand
* Axios
* React Hot Toast
* Swiper

### Backend

* Node.js
* Express 5
* MongoDB
* Mongoose
* Passport.js
* Google OAuth 2.0
* JWT Authentication
* Express Session
* Argon2
* Multer

### Services & Integrations

* Cloudinary
* Stripe
* Razorpay
* Resend / Mailtrap
* Request IP

## Project Structure

```text
wearix/
│
├── frontend/     # Customer storefront
├── backend/      # REST API and business logic
└── admin/        # Admin dashboard
```

## API Modules

### User

* Registration & Login
* Google Authentication
* Email Verification
* Password Reset
* Profile Management

### Products

* Add Product
* Remove Product
* Product Listing
* Product Details

### Cart & Wishlist

* Cart Management
* Wishlist Management
* Item Updates

### Orders

* Place Orders
* Payment Verification
* Order History
* Admin Order Management

## Security Features

* JWT Authentication
* Session-based Authentication
* Google OAuth Login
* Argon2 Password Hashing
* Email Verification
* Password Reset Tokens
* Protected API Routes
* Secure Cookie Handling

## Future Improvements

* Product reviews and ratings
* Coupon and discount system
* Inventory tracking
* Sales analytics dashboard
* Multi-vendor support
* Real-time order notifications

## Author

**Mohd Shahbaz Khan**

If you found this project useful, consider giving it a ⭐ on GitHub.