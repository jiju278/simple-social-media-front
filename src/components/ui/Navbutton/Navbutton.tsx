import { FiHome } from 'react-icons/fi';
import style from '@components/ui/Navbutton/Navbutton.module.css';

const Navbutton = () => {
  return (
    <div className={style.navButton}>
      <FiHome className={style.navButtonLogo} />
      <p className={style.navTextButton}>Home</p>
    </div>
  );
};

export default Navbutton;
