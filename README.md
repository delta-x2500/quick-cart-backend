# Quick-Cart Backend API

A robust, production-ready Express.js REST API for the Quick-Cart e-commerce platform. Built with TypeScript, Prisma ORM, and PostgreSQL.

## 🚀 Features

### Core Functionality

- **🔐 Authentication & Authorization** - JWT-based authentication with role-based access control (Customer, Vendor, Admin)
- **🛍️ Product Management** - Complete CRUD operations for products with image uploads
- **🏪 Multi-Vendor Support** - Vendor registration, store management, and seller approval workflow
- **🛒 Shopping Cart** - Session-based and persistent cart management
- **📦 Order Processing** - Order creation, tracking, and fulfillment
- **💳 Payment Integration** - Stripe payment gateway integration
- **💰 Wallet System** - User wallet for refunds and balance management
- **📍 Pickup Stations** - Manage pickup/delivery locations
- **💬 Messaging** - In-app messaging between users and vendors
- **📊 Categories & Subcategories** - Hierarchical product categorization
- **🎨 Banner Management** - Promotional banner system

### Technical Features

- **📝 API Documentation** - Auto-generated Swagger/OpenAPI documentation
- **🔒 Rate Limiting** - Global rate limiting for API protection
- **🖼️ Image Upload** - Cloudinary integration for image storage
- **✉️ Email Notifications** - Nodemailer integration for transactional emails
- **⚡ Real-time Updates** - WebSocket support
- **🛡️ Input Validation** - Request validation and sanitization
- **🔄 Error Handling** - Comprehensive error handling and logging
- **🌐 CORS** - Configurable CORS for multi-domain support

## 🛠️ Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js 18+        |
| Framework      | Express.js         |
| Language       | TypeScript         |
| Database       | PostgreSQL         |
| ORM            | Prisma             |
| Authentication | JWT (jsonwebtoken) |
| File Storage   | Cloudinary         |
| Payments       | Stripe             |
| Email          | Nodemailer         |
| Documentation  | Swagger UI Express |
| WebSocket      | ws                 |

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **PostgreSQL** database
- **npm** or **pnpm** package manager
- **Cloudinary** account (for image uploads)
- **Stripe** account (for payments)

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd quick-cart-backend
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/quickcart"

# Server
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CLIENT_URL=http://localhost:3001
ADMIN_URL=http://localhost:3002

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application URLs
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI Spec**: [http://localhost:3000/](http://localhost:3000/)

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /refresh-token` - Refresh JWT token
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `GET /approve-seller/:token` - Approve seller account

### Users (`/api/v1/user`)

- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `DELETE /account` - Delete user account
- `GET /` - List all users (Admin)

### Products (`/api/v1/products`)

- `GET /` - List all products (with filters)
- `GET /:id` - Get product by ID
- `POST /` - Create product (Vendor)
- `PUT /:id` - Update product (Vendor)
- `DELETE /:id` - Delete product (Vendor/Admin)

### Stores (`/api/v1/stores`)

- `GET /` - List all stores
- `GET /:id` - Get store by ID
- `POST /` - Create store (Vendor)
- `PUT /:id` - Update store (Vendor)
- `DELETE /:id` - Delete store (Admin)

### Categories (`/api/v1/categories`)

- `GET /` - List all categories
- `POST /` - Create category (Admin)
- `PUT /:id` - Update category (Admin)
- `DELETE /:id` - Delete category (Admin)

### Subcategories (`/api/v1/subcategories`)

- `GET /` - List all subcategories
- `POST /` - Create subcategory (Admin)
- `PUT /:id` - Update subcategory (Admin)
- `DELETE /:id` - Delete subcategory (Admin)

### Cart (`/api/v1/cart`)

- `GET /` - Get user's cart
- `POST /add` - Add item to cart
- `PUT /update` - Update cart item
- `DELETE /remove/:id` - Remove item from cart
- `DELETE /clear` - Clear entire cart

### Orders (`/api/v1/orders`)

- `GET /` - List user's orders
- `GET /:id` - Get order details
- `POST /` - Create new order
- `PUT /:id/status` - Update order status (Vendor)
- `DELETE /:id` - Cancel order

### Payments (`/api/v1/payment`)

- `POST /create-intent` - Create Stripe payment intent
- `POST /webhook` - Stripe webhook handler
- `GET /history` - Payment history

### Wallet (`/api/v1/wallet`)

- `GET /balance` - Get wallet balance
- `POST /add-funds` - Add funds to wallet
- `POST /withdraw` - Withdraw from wallet
- `GET /transactions` - Transaction history

### Banners (`/api/v1/banners`)

- `GET /` - List active banners
- `POST /` - Create banner (Admin)
- `PUT /:id` - Update banner (Admin)
- `DELETE /:id` - Delete banner (Admin)

### Pickup Stations (`/api/v1/pickupstation`)

- `GET /` - List all pickup stations
- `POST /` - Create pickup station (Admin)
- `PUT /:id` - Update pickup station (Admin)
- `DELETE /:id` - Delete pickup station (Admin)

### Messages (`/api/v1/message`)

- `GET /` - List conversations
- `POST /send` - Send message
- `GET /:conversationId` - Get conversation messages
- `PUT /:id/read` - Mark message as read

### Vendors (`/api/v1/vendor`)

- `GET /stats` - Get vendor statistics
- `GET /products` - List vendor's products
- `GET /orders` - List vendor's orders

## 🎯 Available Scripts

| Command              | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `npm run dev`        | Start development server with hot reload                               |
| `npm run build`      | Build for production (generates Prisma client and compiles TypeScript) |
| `npm start`          | Start production server                                                |
| `npm run type-check` | Run TypeScript type checking                                           |

## 🚢 Deployment

### Railway (Recommended)

This project is optimized for Railway deployment. See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

1. Create Railway account
2. Create new project from GitHub
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy automatically on push

## 📁 Project Structure

```
quick-cart-backend/
├── src/
│   ├── config/          # Configuration files (Swagger, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, rate limiting)
│   ├── modules/         # Feature modules
│   ├── routes/          # API route definitions
│   ├── shared/          # Shared utilities and constants
│   ├── types/           # TypeScript type definitions
│   └── utilities/       # Helper functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Database seeding script
├── dist/                # Compiled JavaScript (generated)
├── uploads/             # Local file uploads (development)
├── app.ts               # Application entry point
├── railway.json         # Railway deployment config
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Rate Limiting** - Prevents brute force attacks
- **CORS Protection** - Configurable cross-origin policies
- **Input Validation** - Request validation and sanitization
- **SQL Injection Protection** - Prisma ORM prevents SQL injection
- **Environment Variables** - Sensitive data stored in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For issues and questions:

- Create an issue in the repository
- Contact the development team

## 🙏 Acknowledgments

- Built with Express.js
- Database management by Prisma
- Payment processing by Stripe
- Image hosting by Cloudinary
- Documentation powered by Swagger

---

**Made with ❤️ for Quick-Cart**
