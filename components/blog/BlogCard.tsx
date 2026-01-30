import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  priority?: boolean; // Added priority prop for LCP optimization
}

export default function BlogCard({ post, onClick, priority = false }: BlogCardProps) {
  return (
    <article 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.photo_url || '/images/placeholder.jpg'}
          alt={post.title}
          fill
          priority={priority} // Prioritize loading if true (fixes LCP warning)
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          // Responsive sizes matching the grid: 
          // Mobile (1 col) = 100vw, Tablet (2 cols) = 50vw, Desktop (3 cols) = 33vw
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge>{post.category}</Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.description}
        </p>
        
        <button 
          className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          aria-label={`Read more about ${post.title}`}
        >
          Read Article →
        </button>
      </div>
    </article>
  );
}