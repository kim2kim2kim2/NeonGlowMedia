import { type VideoData } from "@/lib/types";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoCardProps {
  video: VideoData;
  borderColor: string;
  buttonColor: string;
}

export default function VideoCard({ video, borderColor, buttonColor }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const formattedViews = video.views >= 1000 ? `${(video.views / 1000).toFixed(1)}K` : video.views;
  
  const handleClick = () => {
    setIsOpen(true);
  };
  
  return (
    <>
      <div 
        className={`video-card ${borderColor} rounded-lg overflow-hidden bg-[#0A0A0A] hover:bg-[#0A0A0A]/80 transition-all cursor-pointer`}
        onClick={handleClick}
      >
        <div className="relative overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={`${video.title} thumbnail`} 
            className="w-full h-48 object-cover video-thumbnail"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`play-button w-14 h-14 rounded-full ${buttonColor.split(" ")[0].replace("/20", "")} flex items-center justify-center opacity-80`}
            >
              <i className="ri-play-fill text-2xl text-white"></i>
            </div>
          </div>
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-[#121212]/80 text-[#F5F5F5] text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
          <div className="flex items-center text-xs text-[#F5F5F5]/60">
            <span className="flex items-center mr-3"><i className="ri-eye-line mr-1"></i> {formattedViews}</span>
            <span className="flex items-center">
              <i className="ri-time-line mr-1"></i> 
              {new Date(video.createdAt).toLocaleString('no-NO', { 
                day: 'numeric', 
                month: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#0A0A0A] border-[#8A2BE2]/30 p-0 max-w-3xl">
          <div className="video-container">
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            {video.description && (
              <p className="text-[#F5F5F5]/80 text-sm mb-3">{video.description}</p>
            )}
            <div className="flex items-center text-sm text-[#F5F5F5]/60">
              <span className="flex items-center mr-4">
                <i className="ri-eye-line mr-1"></i> {formattedViews} visninger
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
