import { Express } from "express";

export function setupRoutes(app: Express): void {
  // Health check endpoint for Render
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // API routes will be registered here
  // This file can be expanded to include all route registrations
}
