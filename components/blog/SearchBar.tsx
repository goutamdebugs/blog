import { InputHTMLAttributes } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
        <svg 
          className="w-5 h-5 text-gray-500 group-focus-within:text-blue-600 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search for articles, topics, or keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 border-none rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-400 text-lg"
      />
    </div>
  );
}