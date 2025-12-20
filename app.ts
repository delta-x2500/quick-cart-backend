import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { setupSwagger } from "./src/config/swagger.config.js";
import { globalLimiter } from "./src/middleware/rate-limit.js";

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import productRoute from "./src/routes/product.route.js";
import storeRoute from "./src/routes/store.route.js";
import categoryRoute from "./src/routes/category.route.js";
import subcategoryRoute from "./src/routes/subcategory.route.js";
import { approveSeller } from "./src/controllers/auth.controller.js";
import bannerRoute from "./src/routes/banner.route.js";
import cartRoute from "./src/routes/cart.route.js";
import orderRoute from "./src/routes/order.route.js";
import walletRoute from "./src/routes/wallet.route.js";
import pickupstationRoute from "./src/routes/pickupstation.route.js";
import messageRoute from "./src/routes/message.route.js";
import paymentRoute from "./src/routes/payment.route.js";

// Initialize Express
const app: Application = express();

// Apply rate limiting
app.use(globalLimiter);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger Documentation
setupSwagger(app);

// CORS configuration - allow all origins in development
// Using a function to reflect the request origin (required when credentials: true)
// TODO: Add an allowlist of origins in production
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      // or any origin in development
      callback(null, true);
    },
    credentials: true,
  })
);

// General Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/stores", storeRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/products", productRoute);
app.get("/api/v1/approve-seller/:token", approveSeller);
app.use("/api/v1/banners", bannerRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1/pickupstation", pickupstationRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/payment", paymentRoute);

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
  });
});

// Global error handler - must be last middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    res.status(err.status || 500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
        details: err,
      }),
    });
  }
);

// Start server for Railway deployment
const PORT = process.env.PORT || "3000";
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown handlers
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

export default app;
