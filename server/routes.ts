import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Router } from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = Router();
  app.use("/api", apiRouter);
  
  // Get featured video
  apiRouter.get("/featured", async (req, res) => {
    try {
      const featuredVideo = await storage.getFeaturedVideo();
      if (!featuredVideo) {
        return res.status(404).json({ message: "No featured video found" });
      }
      return res.json(featuredVideo);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch featured video" });
    }
  });
  
  // Get videos by category
  apiRouter.get("/videos/:category?", async (req, res) => {
    try {
      const { category } = req.params;
      const videos = await storage.getVideos(category);
      return res.json(videos);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  
  // Get a specific video by ID
  apiRouter.get("/video/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid video ID" });
      }
      
      const video = await storage.getVideoById(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      return res.json(video);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch video" });
    }
  });
  
  // Get images by category
  apiRouter.get("/images/:category?", async (req, res) => {
    try {
      const { category } = req.params;
      const images = await storage.getImages(category);
      return res.json(images);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch images" });
    }
  });
  
  // Get a specific image by ID
  apiRouter.get("/image/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid image ID" });
      }
      
      const image = await storage.getImageById(id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      
      return res.json(image);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
