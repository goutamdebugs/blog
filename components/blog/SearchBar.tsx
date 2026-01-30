import Input from '@/components/ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search articles by title, description, or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-4 py-3 text-lg"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg 
          className="w-5 h-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    </div>
  );
}