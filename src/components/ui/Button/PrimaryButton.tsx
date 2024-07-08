import '../../../styles/component/button.scss'
interface ButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
}

const PrimaryButton = ({ title, className, onClick, type, id, disabled }: ButtonProps) => {
  return (
    <button
      className={`btn-primary ${className}`}
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
