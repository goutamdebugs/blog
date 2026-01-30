# Modern Tech Blog - Next.js

A fast, SEO-optimized tech blog built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4.0**.

## Live Demo & Repository
- **Live URL:** https://dailyblog-zeta.vercel.app/
- **GitHub URL:** https://github.com/goutamdebugs/blog.git
## Tech Stack
  - **Framework:** Next.js (App Router) 
  - **Language:** TypeScript 
  - **Styling:** Tailwind CSS v4.0 
  - **Deployment:** Vercel 

## 📈 Lighthouse Audit Results
We achieved excellent Lighthouse scores across all metrics:
- **SEO:** 100/100 
- **Accessibility:** 94
- **Best Practices:** 100
<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/ec48c3f6-dc22-42dc-ba85-a1837c4ca306" />

## 🔍 SEO Strategy 
1. **Semantic HTML:** Used proper HTML5 tags like `<header>`, `<main>`, `<article>`, and `<footer>` for better accessibility and crawling.
2. **Meta Tags:** Implemented dynamic meta titles, descriptions, and Open Graph/Twitter Card tags for social media optimization.
3. **Structured Data:** Added JSON-LD for articles and the website to enhance search engine understanding.
4. **Technical SEO:** Generated dynamic `sitemap.xml` and `robots.txt` files to guide search engine bots.

## Image Optimization 
- Used Next.js `<Image />` component for all assets.
- Implemented `priority` loading for "Above the Fold" images to improve LCP scores.
- Added descriptive `alt` text to every image for better accessibility.

## Key Features
- **Combined Search & Filter:** Users can search and filter by category simultaneously.
- **Article Modal:** Full content opens in a high-performance modal without page reloads.
- **Keyboard Friendly:** Full support for ESC key and keyboard navigation.

## Challenges Faced
- **Combined Logic:** Ensuring the search bar and category filters worked together seamlessly required a robust filtering utility.
- **LCP Optimization:** Fine-tuning image loading priorities to reach a 90+ performance score on Lighthouse.

## Getting Started
--Node.js 18.17 or later
--npm or yarn package manager

```
# Clone the repository
git clone https://github.com/goutamdebugs/blog.git

# Navigate to project directory
cd blog

# Install dependencies
npm install

# Run development server
npm run dev
```
## API Integration
-The application fetches data from:
```
https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10
```

## Data Schema
```
interface BlogPost {
  id: number;
  title: string;
  description: string;
  content_html: string;
  photo_url: string;
  category: string;
  created_at: string;
}
```
## License
-MIT License - see the LICENSE file for details.

# screenshort
<img width="1920" height="925" alt="image" src="https://github.com/user-attachments/assets/4e34191d-841b-4822-9394-ca03569deadb" />

<img width="1912" height="980" alt="image" src="https://github.com/user-attachments/assets/25f1a663-a07f-4be4-8542-47e5f76e677d" />

