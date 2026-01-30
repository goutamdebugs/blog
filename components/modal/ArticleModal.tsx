import { useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import Button from '@/components/ui/Button';

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ post, isOpen, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 
            id="modal-title"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {post.title}
          </h2>
          <Button
            onClick={onClose}
            variant="secondary"
            className="!p-2"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Hero Image */}
          <div className="relative h-64 w-full">
            <Image
              src={post.photo_url || '/images/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="p-6 space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {post.category}
                </span>
              </div>
              <div>
                <span className="font-semibold">Published:</span>{' '}
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {post.description}
              </p>
            </div>

            {/* HTML Content */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Full Article
              </h3>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <Button onClick={onClose}>
                  Close Article
                </Button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(post.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}