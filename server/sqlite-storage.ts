import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { 
  users, type User, type InsertUser,
  videos, type Video, type InsertVideo,
  images, type Image, type InsertImage
} from "@shared/schema";
import { IStorage } from './storage';
import { eq, sql } from 'drizzle-orm';

// Initialize SQLite database
const sqlite = new Database('neonsvideo.db');
const db = drizzle(sqlite);

export class SQLiteStorage implements IStorage {
  constructor() {
    // Create tables if they don't exist
    this.initializeDatabase();
    
    // Initialize with some data if the database is empty
    this.seedDatabaseIfEmpty();
  }

  private initializeDatabase() {
    // Create users table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

    // Create videos table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        thumbnail_url TEXT NOT NULL,
        video_url TEXT NOT NULL,
        category TEXT NOT NULL,
        duration TEXT,
        views INTEGER DEFAULT 0,
        featured INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create images table
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        username TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private async seedDatabaseIfEmpty() {
    // Check if we already have data
    const result = await sqlite.prepare("SELECT COUNT(*) as count FROM videos").get();
    const count = (result as any)?.count || 0;
    if (count > 0) {
      return; // Database already has data
    }

    // Featured video
    await this.createVideo({
      title: "Dette må du få med deg i dag!",
      description: "Dette klippet har tatt nettet med storm - et must-see for alle!",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "featured",
      duration: "03:32",
      views: 15300,
      featured: true
    });
    
    // Funny videos
    await this.createVideo({
      title: "Når katten oppdager filteret for første gang",
      thumbnailUrl: "https://img.youtube.com/vi/EtH9Yllzjcc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=EtH9Yllzjcc",
      category: "funny",
      duration: "03:42",
      views: 5200
    });
    
    await this.createVideo({
      title: "Barna prøver mat fra 90-tallet for første gang",
      thumbnailUrl: "https://img.youtube.com/vi/RpfXmL2hQuo/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=RpfXmL2hQuo",
      category: "funny",
      duration: "02:18",
      views: 8700
    });
    
    await this.createVideo({
      title: "De beste tabbene fra TV denne uken",
      thumbnailUrl: "https://img.youtube.com/vi/JeimE8Wz6e4/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=JeimE8Wz6e4",
      category: "funny",
      duration: "01:45",
      views: 12400
    });
    
    // Music videos
    await this.createVideo({
      title: "Nye Karpe - 'Heleveien' (Offisiell musikkvideo)",
      thumbnailUrl: "https://img.youtube.com/vi/WcVORwRnQWg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=WcVORwRnQWg",
      category: "music",
      duration: "04:22",
      views: 125000
    });
    
    await this.createVideo({
      title: "Oslo Live Festival 2023 - Høydepunkter",
      thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      category: "music",
      duration: "03:45",
      views: 48300
    });
    
    await this.createVideo({
      title: "Weekly DJ Mix - Beste elektroniske hits denne uken",
      thumbnailUrl: "https://img.youtube.com/vi/Y9E4eSNNsrs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=Y9E4eSNNsrs",
      category: "music",
      duration: "05:17",
      views: 32100
    });
    
    // Cool images
    await this.createImage({
      title: "Nordlys over Tromsø i går kveld",
      imageUrl: "https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 2300,
      views: 7800,
      username: "OlaNordmann"
    });
    
    await this.createImage({
      title: "Ekstrem parkour i Oslo sentrum",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 1800,
      views: 5200,
      username: "ParkourMaster"
    });
    
    await this.createImage({
      title: "Dette streetart-verket dukket opp i natt",
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 3500,
      views: 9700,
      username: "KunstElskeren"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = sqlite.prepare("SELECT * FROM users WHERE id = ?").get(id);
      return result as User | undefined;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = sqlite.prepare("SELECT * FROM users WHERE username = ?").get(username);
      return result as User | undefined;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Using raw exec for insert to avoid type issues
    const stmt = sqlite.prepare(`
      INSERT INTO users (username, password) 
      VALUES (?, ?)
    `);
    
    const info = stmt.run(
      insertUser.username,
      insertUser.password
    );
    
    // Get the inserted user
    const insertedUser = await this.getUser(info.lastInsertRowid as number);
    if (!insertedUser) {
      throw new Error("Failed to retrieve created user");
    }
    
    return insertedUser;
  }

  // Video methods
  async getVideos(category?: string): Promise<Video[]> {
    if (category) {
      return db.select().from(videos).where(eq(videos.category, category));
    }
    return db.select().from(videos);
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    const result = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
    return result[0];
  }

  async getFeaturedVideo(): Promise<Video | undefined> {
    const result = await db.select().from(videos).where(eq(videos.featured, true)).limit(1);
    return result[0];
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    // SQLite doesn't have a Boolean type, so we need to convert it
    const sqliteVideo = {
      ...insertVideo,
      featured: insertVideo.featured ? 1 : 0
    };
    
    // Using raw exec for insert to avoid type issues
    const stmt = sqlite.prepare(`
      INSERT INTO videos (title, description, thumbnail_url, video_url, category, duration, views, featured) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      insertVideo.title,
      insertVideo.description || null,
      insertVideo.thumbnailUrl,
      insertVideo.videoUrl,
      insertVideo.category,
      insertVideo.duration || null,
      insertVideo.views || 0,
      insertVideo.featured ? 1 : 0
    );
    
    // Get the inserted video
    const insertedVideo = await this.getVideoById(info.lastInsertRowid as number);
    if (!insertedVideo) {
      throw new Error("Failed to retrieve created video");
    }
    
    return insertedVideo;
  }

  // Image methods
  async getImages(category?: string): Promise<Image[]> {
    if (category) {
      return db.select().from(images).where(eq(images.category, category));
    }
    return db.select().from(images);
  }

  async getImageById(id: number): Promise<Image | undefined> {
    const result = await db.select().from(images).where(eq(images.id, id)).limit(1);
    return result[0];
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    // Using raw exec for insert to avoid type issues
    const stmt = sqlite.prepare(`
      INSERT INTO images (title, image_url, category, likes, views, username) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      insertImage.title,
      insertImage.imageUrl,
      insertImage.category,
      insertImage.likes || 0,
      insertImage.views || 0,
      insertImage.username
    );
    
    // Get the inserted image
    const insertedImage = await this.getImageById(info.lastInsertRowid as number);
    if (!insertedImage) {
      throw new Error("Failed to retrieve created image");
    }
    
    return insertedImage;
  }
}

export const sqliteStorage = new SQLiteStorage();