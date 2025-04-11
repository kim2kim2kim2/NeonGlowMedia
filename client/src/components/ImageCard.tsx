import { type ImageData } from "@/lib/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ImageCardProps {
  image: ImageData;
  borderColor: string;
}

export default function ImageCard({ image, borderColor }: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const formattedViews = image.views >= 1000 ? `${(image.views / 1000).toFixed(1)}K` : image.views;
  const formattedLikes = image.likes >= 1000 ? `${(image.likes / 1000).toFixed(1)}K` : image.likes;
  
  return (
    <>
      <div 
        className={`video-card ${borderColor} rounded-lg overflow-hidden bg-[#0A0A0A] hover:bg-[#0A0A0A]/80 transition-all cursor-pointer`}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <img 
            src={image.imageUrl} 
            alt={image.title} 
            className="w-full h-64 sm:h-72 object-cover video-thumbnail"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold mb-1 line-clamp-1">{image.title}</h3>
          <div className="flex items-center text-xs text-[#F5F5F5]/60">
            <span className="flex items-center mr-3"><i className="ri-heart-line mr-1"></i> {formattedLikes}</span>
            <span className="flex items-center mr-3"><i className="ri-eye-line mr-1"></i> {formattedViews}</span>
            <span className="flex items-center"><i className="ri-user-line mr-1"></i> {image.username}</span>
          </div>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#0A0A0A] border-[#8A2BE2]/30 p-0 max-w-3xl">
          <div className="max-h-[80vh] overflow-auto">
            <img 
              src={image.imageUrl} 
              alt={image.title} 
              className="w-full object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
            <div className="flex items-center text-sm text-[#F5F5F5]/60">
              <span className="flex items-center mr-3"><i className="ri-heart-line mr-1"></i> {formattedLikes} liker</span>
              <span className="flex items-center mr-3"><i className="ri-eye-line mr-1"></i> {formattedViews} visninger</span>
              <span className="flex items-center"><i className="ri-user-line mr-1"></i> {image.username}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
