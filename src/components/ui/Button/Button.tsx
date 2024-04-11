import style from '@components/ui/Button/Button.module.css';

interface ButtonProps {
  color: 'primary' | 'dark';
  title: string;
}
const Button = ({ color, title }: ButtonProps) => {
  return (
    <button
      className={`${color === 'primary' ? style.primaryColor : color === 'dark' ? style.darkColor : ''} ${style.button}`}
    >
      {title}
    </button>
  );
};

export default Button;
