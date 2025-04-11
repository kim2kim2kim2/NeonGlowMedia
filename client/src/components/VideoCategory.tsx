import { Button } from "@/components/ui/button";
import VideoCard from "./VideoCard";
import { type VideoData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCategoryProps {
  title: string;
  icon: string;
  color: string;
  videos: VideoData[];
  isLoading: boolean;
  buttonColor: string;
  borderColor: string;
}

export default function VideoCategory({ 
  title, 
  icon, 
  color, 
  videos, 
  isLoading, 
  buttonColor,
  borderColor
}: VideoCategoryProps) {
  
  if (isLoading) {
    return (
      <section className="my-12">
        <div className="flex items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-6 w-6 ml-2 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-lg overflow-hidden bg-[#0A0A0A]">
              <Skeleton className="w-full h-48" />
              <div className="p-3">
                <Skeleton className="h-5 w-full mb-1" />
                <div className="flex items-center">
                  <Skeleton className="h-3 w-16 mr-3" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  if (!videos || videos.length === 0) {
    return null;
  }
  
  return (
    <section className="my-12">
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
        <span className={color}>{title}</span>
        <i className={`${icon} ml-2 ${color}`}></i>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            borderColor={borderColor}
            buttonColor={buttonColor}
          />
        ))}
        
        <div className="flex justify-center items-center col-span-full mt-2">
          <Button 
            className={`px-6 py-2 flex items-center space-x-2 ${buttonColor} rounded-full transition-all font-semibold`}
          >
            <span>Se flere {title.toLowerCase()}</span>
            <i className="ri-arrow-right-line"></i>
          </Button>
        </div>
      </div>
    </section>
  );
}
