import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-[#0A0A0A] py-4 px-4 sm:px-6 md:px-8 border-b border-[#8A2BE2]/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="ri-vidicon-fill text-[#8A2BE2] text-3xl animate-pulse-neon"></i>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-[#8A2BE2]">Neons</span><span className="text-[#FF1493]">Video</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="hidden md:flex items-center space-x-2 bg-[#8A2BE2]/20 hover:bg-[#8A2BE2]/30 border-[#8A2BE2]/50"
          >
            <i className="ri-user-line"></i>
            <span>Logg inn</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden text-2xl bg-transparent hover:bg-[#8A2BE2]/20 border-none"
          >
            <i className="ri-menu-line"></i>
          </Button>
        </div>
      </div>
    </header>
  );
}
