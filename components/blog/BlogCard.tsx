import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  priority?: boolean;
}

export default function BlogCard({ post, onClick, priority = false }: BlogCardProps) {
  return (
    <article 
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* image sexction */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={post.photo_url || '/images/placeholder.jpg'}
          alt={post.title}
          fill
          priority={priority}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* content section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider rounded-full">
            {post.category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
          {post.description}
        </p>
        
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group/btn">
          Read Article 
          <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}