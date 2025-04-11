export interface VideoData {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  duration?: string;
  views: number;
  featured?: boolean;
  createdAt: Date;
}

export interface ImageData {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  likes: number;
  views: number;
  username: string;
  createdAt: Date;
}

export type CategoryType = 'funny' | 'cool' | 'music' | 'trending';
