import style from '@components/ui/Button/Button.module.css';

interface ButtonProps {
  color: 'primary' | 'dark';
  title: string;
  onClick?: () => void;
}
const Button = ({ color, title, onClick }: ButtonProps) => {
  return (
    <button
      className={`${color === 'primary' ? style.primaryColor : color === 'dark' ? style.darkColor : ''} ${style.button}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
