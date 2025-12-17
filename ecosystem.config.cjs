const fs = require("fs");
const path = require("path");

// Read .env file and parse it
const envFilePath = path.join(__dirname, ".env");
const envConfig = {};

if (fs.existsSync(envFilePath)) {
  const envFileContent = fs.readFileSync(envFilePath, "utf8");
  envFileContent.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").replace(/^["']|["']$/g, "");
        envConfig[key.trim()] = value.trim();
      }
    }
  });
}

module.exports = {
  apps: [
    {
      name: "quick-cart-backend",
      script: "./dist/app.js",
      instances: 1,
      exec_mode: "fork",
      env: envConfig,
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
