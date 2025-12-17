module.exports = {
  apps: [
    {
      name: "quick-cart-backend",
      script: "./dist/app.js",
      instances: 1,
      exec_mode: "fork",
      env_file: "./.env",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      error_file: "~/.pm2/logs/quick-cart-backend-error.log",
      out_file: "~/.pm2/logs/quick-cart-backend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_restarts: 10,
    },
  ],
};
