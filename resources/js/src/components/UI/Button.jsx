import PropTypes from "prop-types";
import { Link } from "react-router";

const Button = ({
  children,
  variant = "filled",
  color = "blue",
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors";

  const variantStyles = {
    filled: `bg-${color}-600 text-white hover:bg-${color}-700`,
    outline: `border border-${color}-600 text-${color}-600 hover:bg-${color}-50`,
    border: `border-1 border-${color}-600 text-${color}-600 hover:bg-${color}-50`,
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-[30px] py-[30px] text-lg",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <Link className={classes} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["filled", "outline", "border"]),
  color: PropTypes.oneOf(["blue", "red", "green", "purple"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
