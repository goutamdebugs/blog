import { ApiResponse } from './types';

const API_URL = 'https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10';

export async function fetchBlogPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API returned an error');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}