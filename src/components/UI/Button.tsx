import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'md' | 'lg' | 'Icon';
  variant?: 'primary' | 'secondary' | 'plain';
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, href, onClick, size = 'md', variant = 'primary', className = '', external = false, disabled = false, type = 'button', ...props }: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center gap-2 capitalize transition duration-200 ease-out active:scale-[0.98] select-none tracking-none font-medium cursor-pointer';

  const sizeStyles = {
    md: 'rounded-[8px] px-4 py-3 leading-[16px] text-[14px] [&>svg]:text-[16px]',
    lg: 'rounded-full px-4 py-3 leading-[20px] text-[16px]',
    Icon: 'w-10 h-10 text-[16px] rounded-[8px]',
  };

  const variantStyles = {
    primary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    secondary: 'bg-neutral-500 outline outline-1 outline-neutral-400 text-neutral-200 hover:bg-neutral-400',
    plain: 'bg-transparent text-neutral-200 hover:text-neutral-100 outline-none',
  };

  const disabledStyles = 'bg-neutral-600! cursor-not-allowed! text-neutral-400! hover:bg-neutral-600! active:scale-100!';

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} target={external ? '_blank' : undefined} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={disabled ? undefined : onClick} type={type} className={combinedStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
