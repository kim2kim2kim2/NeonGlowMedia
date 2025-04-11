import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import FeaturedVideo from '@/components/FeaturedVideo';
import VideoCategory from '@/components/VideoCategory';
import ImageCategory from '@/components/ImageCategory';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { type CategoryType } from '@/lib/types';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('funny');

  // Query featured video
  const featuredVideoQuery = useQuery({
    queryKey: ['/api/featured'],
  });

  // Query videos for each category
  const funnyVideosQuery = useQuery({
    queryKey: ['/api/videos/funny'],
  });

  const musicVideosQuery = useQuery({
    queryKey: ['/api/videos/music'],
  });

  // Query cool images
  const coolImagesQuery = useQuery({
    queryKey: ['/api/images/cool'],
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <main className="container mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-16 flex-grow">
        <FeaturedVideo video={featuredVideoQuery.data} isLoading={featuredVideoQuery.isLoading} />
        
        <div id="funny">
          <VideoCategory 
            title="Dagens morsomme klipp" 
            icon="ri-emotion-laugh-line" 
            color="text-[#FF1493]" 
            videos={funnyVideosQuery.data || []} 
            isLoading={funnyVideosQuery.isLoading} 
            buttonColor="bg-[#FF1493]/20 hover:bg-[#FF1493]/30 text-[#FF1493]" 
            borderColor="neon-pink-border"
          />
        </div>
        
        <div id="cool">
          <ImageCategory 
            title="Dagens feteste bilder" 
            icon="ri-image-2-line" 
            color="text-[#00BFFF]" 
            images={coolImagesQuery.data || []} 
            isLoading={coolImagesQuery.isLoading} 
            buttonColor="bg-[#00BFFF]/20 hover:bg-[#00BFFF]/30 text-[#00BFFF]" 
            borderColor="neon-blue-border"
          />
        </div>
        
        <div id="music">
          <VideoCategory 
            title="Dagens musikk" 
            icon="ri-music-2-line" 
            color="text-[#39FF14]" 
            videos={musicVideosQuery.data || []} 
            isLoading={musicVideosQuery.isLoading} 
            buttonColor="bg-[#39FF14]/20 hover:bg-[#39FF14]/30 text-[#39FF14]" 
            borderColor="neon-green-border"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
