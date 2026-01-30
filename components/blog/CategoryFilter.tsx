import Badge from '@/components/ui/Badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <h3>
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        <Badge 
          active={selectedCategory === null}
          onClick={() => onSelectCategory(null)}
        >
          All Articles
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category}
            active={selectedCategory === category}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}