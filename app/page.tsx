'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/types';
import { fetchBlogPosts } from '@/lib/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/blog/SearchBar';
import CategoryFilter from '@/components/blog/CategoryFilter';
import BlogList from '@/components/blog/BlogList';
import ArticleModal from '@/components/modal/ArticleModal';

export default function Home() {
  // State for blog posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  // State for modal
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data.blogs);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.blogs.map(post => post.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  // Filter and search logic
  const filteredPosts = posts.filter(post => {
    // Category filter
    if (selectedCategory && post.category !== selectedCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim() === '') {
      return true;
    }
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content_text.toLowerCase().includes(query)
    );
  });

  // Handle post click
  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Tech Blog
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover the latest in technology, programming, and software development.
              Explore {posts.length} curated articles from industry experts.
            </p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 space-y-8">
            <div className="max-w-3xl mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            
            <div className="max-w-6xl mx-auto">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </section>
        
        {/* Articles Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Latest Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredPosts.length} of {posts.length} articles
              </p>
            </div>
            
            <BlogList
              posts={filteredPosts}
              onPostClick={handlePostClick}
            />
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Modal for Article Details */}
      <ArticleModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}