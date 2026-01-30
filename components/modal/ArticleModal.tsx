import { useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ post, isOpen, onClose }: ArticleModalProps) {
  // ESC key press করলে মডাল বন্ধ হবে
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // পেছনের পেজ স্ক্রল বন্ধ করা
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
        
        {/* 1. Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-10 sticky top-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {post.category}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Scrollable Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 bg-gray-200 dark:bg-gray-800">
            <Image
              src={post.photo_url || '/images/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight shadow-black drop-shadow-md">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>
{/* 
          body of this aritcal */}
          <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-gray-900">
            {/*description section*/}
            <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 uppercase mb-1">
                Overview
              </h3>
              <p className="text-gray-800 dark:text-gray-200 italic">
                {post.description}
              </p>
            </div>

            {/* main content */}
            <div 
              className="prose dark:prose-invert prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </div>
        </div>

        {/* simple  footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-10 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}