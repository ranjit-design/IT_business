# Deployment Guide for Render

This guide will help you deploy the Ranjit Agency website to Render successfully.

## Prerequisites

- GitHub repository with your code
- Render account (free tier is sufficient)

## Step 1: Prepare Your Repository

1. Make sure all changes are committed and pushed to GitHub
2. Ensure your repository contains:
   - `render.yaml` (already included)
   - `package.json` with build/start scripts
   - `.env.example` (for reference)

## Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration

## Step 3: Configure Environment Variables

In your Render service settings, add these environment variables:

```
NODE_ENV=production
PORT=10000
```

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build the application
   - Start the server
3. Your app will be available at `https://your-app-name.onrender.com`

## Step 5: Verify Deployment

Check these endpoints:
- Main site: `https://your-app-name.onrender.com`
- Health check: `https://your-app-name.onrender.com/api/health`
- API endpoints: `https://your-app-name.onrender.com/api/*`

## Important Notes

### Data Persistence
- Current setup uses in-memory storage
- Data resets on every deploy/restart
- For production, add Render Postgres database

### Performance
- Free tier has cold starts (may take 30-60 seconds to load)
- Consider upgrading to paid tier for better performance

### Custom Domain
- Add custom domain in Render dashboard
- Update DNS settings as instructed by Render

### Troubleshooting

**Build fails:**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json

**App not loading:**
- Check environment variables
- Verify health check endpoint responds
- Check server logs

**Contact form not working:**
- API endpoints should be accessible
- Check browser console for errors
- Verify CORS settings if needed

## Next Steps

1. Monitor your deployment logs
2. Set up monitoring/alerts if needed
3. Consider adding a database for persistent storage
4. Set up custom domain for professional appearance

## Support

If you encounter issues:
1. Check Render documentation
2. Review build and server logs
3. Verify all configuration files are present
