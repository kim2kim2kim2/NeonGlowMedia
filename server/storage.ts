import { 
  users, type User, type InsertUser,
  videos, type Video, type InsertVideo,
  images, type Image, type InsertImage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video methods
  getVideos(category?: string): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  getFeaturedVideo(): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Image methods
  getImages(category?: string): Promise<Image[]>;
  getImageById(id: number): Promise<Image | undefined>;
  createImage(image: InsertImage): Promise<Image>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videos: Map<number, Video>;
  private images: Map<number, Image>;
  
  private userIdCounter: number;
  private videoIdCounter: number;
  private imageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.images = new Map();
    
    this.userIdCounter = 1;
    this.videoIdCounter = 1;
    this.imageIdCounter = 1;
    
    // Initialize with some data
    this.initializeData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getVideos(category?: string): Promise<Video[]> {
    const allVideos = Array.from(this.videos.values());
    if (category) {
      return allVideos.filter(video => video.category === category);
    }
    return allVideos;
  }
  
  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }
  
  async getFeaturedVideo(): Promise<Video | undefined> {
    return Array.from(this.videos.values()).find(video => video.featured);
  }
  
  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.videoIdCounter++;
    const now = new Date();
    const video: Video = { 
      ...insertVideo, 
      id, 
      createdAt: now,
      views: insertVideo.views || 0,
      featured: insertVideo.featured || false
    };
    this.videos.set(id, video);
    return video;
  }
  
  async getImages(category?: string): Promise<Image[]> {
    const allImages = Array.from(this.images.values());
    if (category) {
      return allImages.filter(image => image.category === category);
    }
    return allImages;
  }
  
  async getImageById(id: number): Promise<Image | undefined> {
    return this.images.get(id);
  }
  
  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = this.imageIdCounter++;
    const now = new Date();
    const image: Image = { 
      ...insertImage, 
      id, 
      createdAt: now,
      likes: insertImage.likes || 0,
      views: insertImage.views || 0
    };
    this.images.set(id, image);
    return image;
  }
  
  private initializeData() {
    // Featured video
    this.createVideo({
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
    this.createVideo({
      title: "Når katten oppdager filteret for første gang",
      thumbnailUrl: "https://img.youtube.com/vi/EtH9Yllzjcc/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=EtH9Yllzjcc",
      category: "funny",
      duration: "03:42",
      views: 5200
    });
    
    this.createVideo({
      title: "Barna prøver mat fra 90-tallet for første gang",
      thumbnailUrl: "https://img.youtube.com/vi/RpfXmL2hQuo/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=RpfXmL2hQuo",
      category: "funny",
      duration: "02:18",
      views: 8700
    });
    
    this.createVideo({
      title: "De beste tabbene fra TV denne uken",
      thumbnailUrl: "https://img.youtube.com/vi/JeimE8Wz6e4/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=JeimE8Wz6e4",
      category: "funny",
      duration: "01:45",
      views: 12400
    });
    
    // Music videos
    this.createVideo({
      title: "Nye Karpe - 'Heleveien' (Offisiell musikkvideo)",
      thumbnailUrl: "https://img.youtube.com/vi/WcVORwRnQWg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=WcVORwRnQWg",
      category: "music",
      duration: "04:22",
      views: 125000
    });
    
    this.createVideo({
      title: "Oslo Live Festival 2023 - Høydepunkter",
      thumbnailUrl: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      category: "music",
      duration: "03:45",
      views: 48300
    });
    
    this.createVideo({
      title: "Weekly DJ Mix - Beste elektroniske hits denne uken",
      thumbnailUrl: "https://img.youtube.com/vi/Y9E4eSNNsrs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=Y9E4eSNNsrs",
      category: "music",
      duration: "05:17",
      views: 32100
    });
    
    // Cool images
    this.createImage({
      title: "Nordlys over Tromsø i går kveld",
      imageUrl: "https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 2300,
      views: 7800,
      username: "OlaNordmann"
    });
    
    this.createImage({
      title: "Ekstrem parkour i Oslo sentrum",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 1800,
      views: 5200,
      username: "ParkourMaster"
    });
    
    this.createImage({
      title: "Dette streetart-verket dukket opp i natt",
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=550&q=80",
      category: "cool",
      likes: 3500,
      views: 9700,
      username: "KunstElskeren"
    });
  }
}

export const storage = new MemStorage();
