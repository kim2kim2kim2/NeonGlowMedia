import { type CategoryType } from '@/lib/types';

interface NavigationProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export default function Navigation({ activeCategory, onCategoryChange }: NavigationProps) {
  const categories = [
    { id: 'funny', name: 'Dagens morsomme klipp', color: 'text-[#FF1493]' },
    { id: 'cool', name: 'Dagens feteste bilder', color: 'text-[#00BFFF]' },
    { id: 'music', name: 'Dagens musikk', color: 'text-[#39FF14]' },
    { id: 'trending', name: 'Trender nå', color: 'text-[#FFFF00]' },
  ];
  
  return (
    <nav className="sticky top-0 z-10 bg-[#121212]/90 backdrop-blur-md py-3 border-b border-[#00BFFF]/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 overflow-x-auto">
        <ul className="flex space-x-6 md:space-x-10 whitespace-nowrap">
          {categories.map((category) => (
            <li key={category.id}>
              <a 
                href={`#${category.id}`} 
                className={`category-indicator ${activeCategory === category.id ? 'category-active ' + category.color : 'text-[#F5F5F5]'} 
                           font-bold text-lg transition-colors hover:${category.color} relative`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                  onCategoryChange(category.id as CategoryType);
                }}
              >
                {category.name}
                <span className={`absolute bottom-[-8px] left-0 w-full h-[3px] ${category.color} 
                                 ${activeCategory === category.id ? 'scale-x-100' : 'scale-x-0'}
                                 origin-left transition-transform duration-300 shadow-glow`}
                ></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
