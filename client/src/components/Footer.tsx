export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-8 border-t border-[#8A2BE2]/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <i className="ri-vidicon-fill text-[#8A2BE2] text-2xl"></i>
            <h2 className="text-xl font-bold">
              <span className="text-[#8A2BE2]">Neons</span><span className="text-[#FF1493]">Video</span>
            </h2>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-[#FF1493] transition-colors">
              <i className="ri-instagram-line text-xl"></i>
            </a>
            <a href="#" className="hover:text-[#FF1493] transition-colors">
              <i className="ri-youtube-line text-xl"></i>
            </a>
            <a href="#" className="hover:text-[#FF1493] transition-colors">
              <i className="ri-facebook-line text-xl"></i>
            </a>
            <a href="#" className="hover:text-[#FF1493] transition-colors">
              <i className="ri-twitter-x-line text-xl"></i>
            </a>
          </div>
          
          <div className="text-sm text-[#F5F5F5]/60">
            &copy; {new Date().getFullYear()} NeonsVideo - Dagens lyspunkt
          </div>
        </div>
      </div>
    </footer>
  );
}
