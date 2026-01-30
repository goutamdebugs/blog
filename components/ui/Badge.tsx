interface BadgeProps {
  children: string;
  onClick?: () => void;
  active?: boolean;
}

export default function Badge({ children, onClick, active = false }: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );
}