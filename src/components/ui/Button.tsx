import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "solid",
  className,
  onClick,
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200";

  const solid =
    "text-white hover:bg-dark active:scale-95";
  const outline =
    "hover:text-white hover:border-white hover:bg-dark active:scale-95";

  return (
    <button
      onClick={onClick}
      className={clsx(
        base,
        variant === "solid" ? solid : outline,
        className
      )}
    >
      {children}
    </button>
  );
}
