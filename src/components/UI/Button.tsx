import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'plain';
  className?: string;
  external?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  href,
  onClick,
  size = 'md',
  variant = 'primary',
  className = '',
  external = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'flex items-center justify-center  rounded-full capitalize transition duration-200 ease-in-out active:scale-[0.98] select-none tracking-none font-semibold min-w-[52px] cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-2 text-[14px] leading-[16px] gap-1.5',
    md: 'px-4 py-3 text-[16px] leading-[20px] gap-2',
    lg: 'px-6 py-3.5 text-[18px] leading-[22px] gap-2',
  };

  const variantStyles = {
    primary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
    secondary: 'bg-neutral-500 text-neutral-200 hover:bg-neutral-400',
    plain:
      'bg-transparent text-neutral-300 hover:bg-transparent active:scale-100',
  };

  const disabledStyles =
    'bg-neutral-600! cursor-not-allowed! text-neutral-400! hover:bg-neutral-600! active:scale-100!';

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        className={combinedStyles}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
