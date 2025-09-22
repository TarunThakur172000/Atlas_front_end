export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  let baseClasses = "px-4 py-2 rounded font-semibold transition-colors duration-200";

  let variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-400 text-white hover:bg-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
