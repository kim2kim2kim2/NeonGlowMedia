import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReactPlayer from "react-player/youtube";
import { type VideoData } from "@/lib/types";

interface FeaturedVideoProps {
  video?: VideoData;
  isLoading: boolean;
}

export default function FeaturedVideo({ video, isLoading }: FeaturedVideoProps) {
  if (isLoading) {
    return (
      <section id="featured" className="mb-12">
        <div className="flex items-center mb-4">
          <Skeleton className="h-6 w-6 mr-2 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Card className="bg-[#0A0A0A] border-[#8A2BE2]/20">
          <CardContent className="p-0">
            <Skeleton className="w-full h-[0] pb-[56.25%] relative" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center mt-3">
                <Skeleton className="h-4 w-20 mr-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <section id="featured" className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
        <i className="ri-fire-fill text-[#FF1493] mr-2"></i>
        <span>Høydepunktet i dag</span>
      </h2>
      
      <Card className="bg-[#0A0A0A] rounded-xl overflow-hidden shadow-lg border border-[#8A2BE2]/20">
        <CardContent className="p-0">
          <div className="video-container">
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls={true}
              light={video.thumbnailUrl}
              playing={false}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            <p className="text-[#F5F5F5]/80 text-sm">{video.description}</p>
            <div className="flex items-center mt-3 text-sm text-[#F5F5F5]/60">
              <span className="flex items-center mr-4">
                <i className="ri-eye-line mr-1"></i> {video.views >= 1000 ? `${(video.views / 1000).toFixed(1)}K` : video.views}
              </span>
              <span className="flex items-center">
                <i className="ri-time-line mr-1"></i> {video.duration}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
