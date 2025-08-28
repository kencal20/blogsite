// src/components/ui/cardComponent.tsx
type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CardComponent({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
    
  );
}
