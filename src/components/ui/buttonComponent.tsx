import type { componentProps } from "../../constants/path";

type ButtonProps = componentProps['buttonProps'];

export default function ButtonComponent({
  content,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  iconLeft,
  iconRight,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-xl font-medium shadow-sm
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      {content}
      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
}
