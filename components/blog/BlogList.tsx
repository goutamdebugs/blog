import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export default function BlogList({ posts, onPostClick }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          // Pass priority=true to the first 3 items (top row) to fix LCP warning
          priority={index < 3} 
          onClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
}