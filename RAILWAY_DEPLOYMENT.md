# Railway Deployment Guide for Quick-Cart Backend

This guide walks you through deploying the Quick-Cart backend to Railway.

## Prerequisites

- [Railway Account](https://railway.app/) (sign up for free)
- GitHub repository connected to Railway
- PostgreSQL database (Railway provides this)

## Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `quick-cart-backend` repository
5. Railway will automatically detect it as a Node.js project

## Step 2: Add PostgreSQL Database

1. In your Railway project, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically create a PostgreSQL instance
3. The database connection string will be available as `DATABASE_URL` environment variable

## Step 3: Configure Environment Variables

Add the following environment variables in Railway:

### Required Variables

```bash
# Database (automatically provided by Railway)
DATABASE_URL=postgresql://...

# Application
NODE_ENV=production
PORT=3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (if using email features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CORS
CLIENT_URL=https://your-frontend.com
ADMIN_URL=https://your-admin.com
```

### How to Add Environment Variables

1. In your Railway project, go to **Variables**
2. Click **"New Variable"**
3. Add each variable from the list above
4. Click **"Add"** to save

## Step 4: Database Migration

Railway will automatically run `npm run build` which includes `prisma generate`.

To run migrations:

1. Go to your Railway project
2. Click on your service
3. Go to **Settings** → **Deploy**
4. Add a deploy script in `package.json` if needed:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && tsc"
  }
}
```

Or manually run migrations via Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migrations
railway run npx prisma migrate deploy
```

## Step 5: Deploy

Railway automatically deploys when you push to your main branch.

### Manual Deployment

1. Push your code to GitHub
2. Railway will automatically detect changes and deploy
3. Monitor the build logs in Railway dashboard

### Build Process

Railway will:

1. Install dependencies: `npm install`
2. Run build command: `npm run build`
3. Start the server: `npm start`

## Step 6: Verify Deployment

1. Once deployed, Railway provides a URL like: `https://your-app.up.railway.app`
2. Test your API endpoints:
   - Health check: `https://your-app.up.railway.app/`
   - API docs: `https://your-app.up.railway.app/api-docs`

## Custom Domain (Optional)

1. In Railway project settings, go to **Settings** → **Domains**
2. Click **"Generate Domain"** or **"Custom Domain"**
3. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

**Issue**: Build fails with Prisma errors

**Solution**: Ensure `DATABASE_URL` is set and `prisma generate` runs before `tsc`

```json
{
  "scripts": {
    "build": "prisma generate && tsc"
  }
}
```

### Database Connection Issues

**Issue**: Cannot connect to database

**Solution**:

- Verify `DATABASE_URL` environment variable is set
- Check if PostgreSQL service is running in Railway
- Ensure Prisma schema is correct

### Port Binding Issues

**Issue**: Application doesn't start

**Solution**: Railway automatically sets `PORT` environment variable. Ensure your app uses it:

```typescript
const PORT = process.env.PORT || "3000";
```

### Memory Issues

**Issue**: Application crashes due to memory

**Solution**:

1. Go to Railway project **Settings**
2. Increase memory allocation
3. Free tier has 512MB, upgrade for more

### Migrations Not Running

**Issue**: Database schema not updated

**Solution**: Run migrations manually via Railway CLI:

```bash
railway run npx prisma migrate deploy
```

Or add to build script:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && tsc"
  }
}
```

## Monitoring

### View Logs

1. Go to your Railway project
2. Click on your service
3. Navigate to **Deployments**
4. Click on latest deployment to view logs

### Metrics

Railway provides built-in metrics:

- CPU usage
- Memory usage
- Network traffic
- Request count

## Scaling (Pro Plan)

For high traffic, consider:

1. Upgrading to Railway Pro plan
2. Horizontal scaling with multiple instances
3. Adding Redis for caching
4. Using CDN for static assets

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Prisma Railway Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-railway)
- [Node.js on Railway](https://docs.railway.app/guides/nodejs)

## Support

If you encounter issues:

1. Check Railway [Discord Community](https://discord.gg/railway)
2. Review [Railway Status Page](https://status.railway.app/)
3. Contact Railway support via dashboard
