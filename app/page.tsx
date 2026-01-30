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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch blog posts on mount
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data.blogs);

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

  // Filter logic
  const filteredPosts = posts.filter(post => {
    if (selectedCategory && post.category !== selectedCategory) return false;
    if (searchQuery.trim() === '') return true;

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content_text.toLowerCase().includes(query)
    );
  });

  // Open modal
  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 animate-pulse">Curating tech stories...</p>
      </div>
    );
  }

  // Error UI
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header />

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative bg-gray-900 pt-24 pb-32 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
              Hi developer, let’s code with chaa
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Tech Blog
              </span>
            </h1>

            {/* Search Bar */}
            <div className="mb-12 transform hover:scale-[1.01] transition-transform duration-300">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </section>

        {/* Articles Section with ID for scroll navigation */}
        <section id="articles" className="py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Latest Articles
              </h2>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {filteredPosts.length} posts found
              </span>
            </div>

            <BlogList
              posts={filteredPosts}
              onPostClick={handlePostClick}
            />
          </div>
        </section>

      </main>

      <Footer />

      <ArticleModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
